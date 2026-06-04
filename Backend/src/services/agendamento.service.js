import * as agendamentoRepo from '../repositories/agendamento.repository.js'
import prisma from '../config/prisma.js'
import { AppError } from '../utils/AppError.js'

function buildInicio(data) {
  if (data.inicio) {
    const date = new Date(data.inicio)
    if (Number.isNaN(date.getTime())) throw new AppError('Data de início inválida', 400)
    return date
  }

  if (!data.data || !data.horaInicio) {
    throw new AppError('Data e hora de início são obrigatórias', 400)
  }

  const date = new Date(`${data.data}T${data.horaInicio}:00`)
  if (Number.isNaN(date.getTime())) throw new AppError('Data ou hora de início inválida', 400)
  return date
}

function pad(number) {
  return String(number).padStart(2, '0')
}

function formatLocalDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function formatLocalTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function mapAgendamento(agendamento) {
  const inicio = agendamento.inicio ? new Date(agendamento.inicio) : null
  const fim = agendamento.fim ? new Date(agendamento.fim) : null

  // Ajusta o status para "Finalizado" na exibição quando a data/hora de fim já passou,
  // sem alterar o registro no banco. Não altera status quando já estiver Cancelado.
  const now = new Date()
  let status = agendamento.status
  if (fim && fim.getTime() < now.getTime() && status !== 'Cancelado' && status !== 'Finalizado') {
    status = 'Finalizado'
  }

  return {
    ...agendamento,
    data: inicio ? formatLocalDate(inicio) : null,
    horaInicio: inicio ? formatLocalTime(inicio) : null,
    horaFim: fim ? formatLocalTime(fim) : null,
    status,
  }
}

async function validateRelations(data) {
  const [cliente, profissional, sala, servico] = await Promise.all([
    prisma.cliente.findUnique({ where: { id: data.clienteId } }),
    prisma.profissional.findUnique({ where: { id: data.profissionalId } }),
    prisma.sala.findUnique({ where: { id: data.salaId } }),
    prisma.servico.findUnique({ where: { id: data.servicoId } }),
  ])

  if (!cliente) throw new AppError('Cliente não encontrado', 404)
  if (!profissional) throw new AppError('Profissional não encontrado', 404)
  if (!profissional.ativo) throw new AppError('Profissional inativo não pode receber agendamentos', 400)
  if (!sala) throw new AppError('Sala não encontrada', 404)
  if (!servico) throw new AppError('Serviço não encontrado', 404)

  return { cliente, profissional, sala, servico }
}

async function ensureNoConflict(data, inicio, fim, excludeId = null) {
  const conflito = await agendamentoRepo.findConflitoAgendamento(
    data.profissionalId,
    data.salaId,
    inicio,
    fim,
    excludeId,
  )

  if (!conflito) return

  const message = conflito.profissionalId === data.profissionalId
    ? 'Profissional já possui agendamento nesse horário'
    : 'Sala já possui agendamento nesse horário'

  throw new AppError(message, 409)
}

export async function criarAgendamentoService(data) {
  const { servico } = await validateRelations(data)
  const inicio = buildInicio(data)
  const fim = new Date(inicio.getTime() + servico.duracaoMin * 60000)

  await ensureNoConflict(data, inicio, fim)

  const agendamento = await agendamentoRepo.createAgendamento({
    clienteId: data.clienteId,
    profissionalId: data.profissionalId,
    salaId: data.salaId,
    servicoId: data.servicoId,
    inicio,
    fim,
    status: data.status || 'Pendente',
  })

  return buscarAgendamentoService(agendamento.id)
}

export async function listarAgendamentosService(params = {}) {
  const where = {}
  if (params.status) where.status = params.status
  if (params.inicio) where.inicio = { gte: new Date(params.inicio) }
  if (params.fim) where.fim = { lte: new Date(params.fim) }

  let agendamentos = await agendamentoRepo.findAgendamentosWithRelations(where, params.limite)

  // Persistir como Finalizado todos os agendamentos cujo fim já passou
  try {
    const now = new Date()
    const toFinalize = agendamentos.filter(a => a.fim && a.fim.getTime && a.fim.getTime() < now.getTime() && a.status !== 'Cancelado' && a.status !== 'Finalizado')
    if (toFinalize.length) {
      await Promise.all(toFinalize.map((a) => agendamentoRepo.updateAgendamento(a.id, { status: 'Finalizado' })))
      agendamentos = await agendamentoRepo.findAgendamentosWithRelations(where, params.limite)
    }
  } catch (err) {
    // não falhar a listagem por causa de erro ao atualizar status
  }

  return agendamentos.map(mapAgendamento)
}

export async function buscarAgendamentoService(id) {
  let agendamento = await agendamentoRepo.findAgendamentoById(id)
  if (!agendamento) return null

  try {
    const now = new Date()
    if (agendamento.fim && agendamento.fim.getTime && agendamento.fim.getTime() < now.getTime() && agendamento.status !== 'Cancelado' && agendamento.status !== 'Finalizado') {
      await agendamentoRepo.updateAgendamento(id, { status: 'Finalizado' })
      agendamento = await agendamentoRepo.findAgendamentoById(id)
    }
  } catch (err) {
    // ignorar erro de persistência
  }

  return mapAgendamento(agendamento)
}

export async function atualizarAgendamentoService(id, data) {
  const atual = await agendamentoRepo.findAgendamentoById(id)
  if (!atual) throw new AppError('Agendamento não encontrado', 404)

  const { servico } = await validateRelations(data)
  const inicio = buildInicio(data)
  const fim = new Date(inicio.getTime() + servico.duracaoMin * 60000)

  await ensureNoConflict(data, inicio, fim, id)

  await agendamentoRepo.updateAgendamento(id, {
    clienteId: data.clienteId,
    profissionalId: data.profissionalId,
    salaId: data.salaId,
    servicoId: data.servicoId,
    inicio,
    fim,
    status: data.status || 'Pendente',
  })

  return buscarAgendamentoService(id)
}

export async function deletarAgendamentoService(id) {
  return agendamentoRepo.deleteAgendamento(id)
}

export async function alterarStatusAgendamentoService(id, status) {
  if (!['Pendente', 'Confirmado', 'Cancelado', 'Finalizado'].includes(status)) {
    throw new AppError('Status inválido', 400)
  }

  const agendamento = await agendamentoRepo.updateAgendamento(id, { status })
  return mapAgendamento(agendamento)
}

export async function cancelarAgendamentoService(id) {
  const agendamento = await agendamentoRepo.updateAgendamento(id, { status: 'Cancelado' })
  return mapAgendamento(agendamento)
}

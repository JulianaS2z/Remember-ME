import {
  criarAgendamentoService,
  listarAgendamentosService,
  buscarAgendamentoService,
  atualizarAgendamentoService,
  deletarAgendamentoService,
  alterarStatusAgendamentoService,
  cancelarAgendamentoService,
} from '../services/agendamento.service.js'

export async function criarAgendamento(req, res, next) {
  try {
    const agendamento = await criarAgendamentoService(req.body)
    return res.status(201).json(agendamento)
  } catch (error) {
    return next(error)
  }
}

export async function listarAgendamentos(req, res, next) {
  try {
    const agendamentos = await listarAgendamentosService(req.query)
    return res.json(agendamentos)
  } catch (error) {
    return next(error)
  }
}

export async function buscarAgendamento(req, res, next) {
  try {
    const agendamento = await buscarAgendamentoService(req.params.id)
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado' })
    return res.json(agendamento)
  } catch (error) {
    return next(error)
  }
}

export async function atualizarAgendamento(req, res, next) {
  try {
    const agendamento = await atualizarAgendamentoService(req.params.id, req.body)
    return res.json(agendamento)
  } catch (error) {
    return next(error)
  }
}

export async function deletarAgendamento(req, res, next) {
  try {
    await deletarAgendamentoService(req.params.id)
    return res.json({ mensagem: 'Agendamento deletado com sucesso' })
  } catch (error) {
    return next(error)
  }
}

export async function alterarStatusAgendamento(req, res, next) {
  try {
    const agendamento = await alterarStatusAgendamentoService(req.params.id, req.body.status)
    return res.json(agendamento)
  } catch (error) {
    return next(error)
  }
}

export async function cancelarAgendamento(req, res, next) {
  try {
    const agendamento = await cancelarAgendamentoService(req.params.id)
    return res.json({ mensagem: 'Agendamento cancelado', agendamento })
  } catch (error) {
    return next(error)
  }
}

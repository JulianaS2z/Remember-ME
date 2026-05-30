import * as agendamentoRepo from '../repositories/agendamento.repository.js';
import prisma from '../config/prisma.js';

export async function criarAgendamentoService(data) {
  const servico = await prisma.servico.findUnique({ where: { id: data.servicoId } });
  if (!servico) throw new Error('Serviço não encontrado');

  const inicio = new Date(data.inicio);
  const fim = new Date(inicio.getTime() + servico.duracaoMin * 60000);

  const conflito = await agendamentoRepo.findConflitoAgendamento(data.profissionalId, data.salaId, inicio, fim);
  if (conflito) {
    const conflictType = conflito.profissionalId === data.profissionalId ? 'profissional' : 'sala';
    throw new Error(`${conflictType === 'profissional' ? 'Profissional' : 'Sala'} já possui agendamento nesse horário`);
  }

  return agendamentoRepo.createAgendamento({
    ...data,
    inicio,
    fim,
    status: 'agendado'
  });
}

export async function listarAgendamentosService() {
  return agendamentoRepo.findAgendamentosWithRelations();
}

export async function cancelarAgendamentoService(id) {
  return agendamentoRepo.cancelAgendamento(id);
}

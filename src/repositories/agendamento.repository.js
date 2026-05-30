import prisma from '../config/prisma.js';

export function createAgendamento(data) {
  return prisma.agendamento.create({ data });
}

export function findAgendamentosWithRelations() {
  return prisma.agendamento.findMany({
    include: { cliente: true, profissional: true, sala: true, servico: true }
  });
}

export function findConflitoAgendamento(profissionalId, salaId, inicio, fim) {
  return prisma.agendamento.findFirst({
    where: {
      OR: [
        {
          profissionalId,
          status: 'agendado',
          inicio: { lt: fim },
          fim: { gt: inicio }
        },
        {
          salaId,
          status: 'agendado',
          inicio: { lt: fim },
          fim: { gt: inicio }
        }
      ]
    }
  });
}

export function cancelAgendamento(id) {
  return prisma.agendamento.update({ where: { id }, data: { status: 'cancelado' } });
}

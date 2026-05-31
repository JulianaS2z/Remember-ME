import prisma from '../config/prisma.js'

export function createAgendamento(data) {
  return prisma.agendamento.create({ data })
}

export function findAgendamentosWithRelations(where = {}, limit) {
  return prisma.agendamento.findMany({
    where,
    include: { cliente: true, profissional: true, sala: true, servico: true },
    orderBy: { inicio: 'asc' },
    take: limit ? Number(limit) : undefined,
  })
}

export function findAgendamentoById(id) {
  return prisma.agendamento.findUnique({
    where: { id },
    include: { cliente: true, profissional: true, sala: true, servico: true },
  })
}

export function findConflitoAgendamento(profissionalId, salaId, inicio, fim, excludeId = null) {
  const conditions = [
    { status: { in: ['Pendente', 'Confirmado'] } },
    {
      OR: [
        {
          profissionalId,
          inicio: { lt: fim },
          fim: { gt: inicio },
        },
        {
          salaId,
          inicio: { lt: fim },
          fim: { gt: inicio },
        },
      ],
    },
  ]

  if (excludeId) {
    conditions.push({ id: { not: excludeId } })
  }

  return prisma.agendamento.findFirst({
    where: {
      AND: conditions,
    },
  })
}

export function updateAgendamento(id, data) {
  return prisma.agendamento.update({ where: { id }, data })
}

export function deleteAgendamento(id) {
  return prisma.agendamento.delete({ where: { id } })
}

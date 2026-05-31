import prisma from '../config/prisma.js'

function formatCurrency(value) {
  return Number(value.toFixed(2))
}

function monthLabel(date) {
  return date.toLocaleString('pt-BR', { month: 'short' })
}

export async function getDashboardStats() {
  const [clientes, profissionais, servicos, agendamentos] = await Promise.all([
    prisma.cliente.count(),
    prisma.profissional.count(),
    prisma.servico.count(),
    prisma.agendamento.count(),
  ])

  const agendamentosComServico = await prisma.agendamento.findMany({
    where: { status: { notIn: ['Cancelado'] } },
    include: { servico: true },
  })

  const receita = agendamentosComServico.reduce((sum, ag) => sum + (ag.servico?.preco || 0), 0)

  const porMes = agendamentosComServico
    .reduce((acc, ag) => {
      const date = new Date(ag.inicio)
      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (!acc[key]) acc[key] = { mes: monthLabel(date), total: 0 }
      acc[key].total += 1
      return acc
    }, {})

  const porServico = agendamentosComServico.reduce((acc, ag) => {
    const name = ag.servico?.nome || 'Outro'
    if (!acc[name]) acc[name] = { name, value: 0 }
    acc[name].value += 1
    return acc
  }, {})

  const proximos = await prisma.agendamento.findMany({
    where: {
      status: 'Confirmado',
      inicio: { gte: new Date() },
    },
    include: { cliente: true, servico: true, sala: true, profissional: true },
    orderBy: { inicio: 'asc' },
    take: 6,
  })

  return {
    clientes,
    profissionais,
    servicos,
    agendamentos,
    ensaios: agendamentos,
    receita: `R$ ${formatCurrency(receita)}`,
    porMes: Object.values(porMes).slice(0, 6),
    porServico: Object.values(porServico).slice(0, 6),
    proximos,
  }
}

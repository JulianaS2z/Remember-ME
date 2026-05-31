import prisma from '../config/prisma.js'

export function createSolicitacaoAcesso(data) {
  return prisma.solicitacaoAcesso.create({ data })
}

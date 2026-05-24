import prisma from '../config/prisma.js';

export function createServico(data) {
  return prisma.servico.create({ data });
}

export function findAllServicos() {
  return prisma.servico.findMany();
}

export function deleteServico(id) {
  return prisma.servico.delete({ where: { id } });
}

import prisma from '../config/prisma.js';

export function createServico(data) {
  return prisma.servico.create({ data });
}

export function findAllServicos() {
  return prisma.servico.findMany();
}

export function findServicoById(id) {
  return prisma.servico.findUnique({ where: { id } });
}

export function updateServico(id, data) {
  return prisma.servico.update({ where: { id }, data });
}

export function deleteServico(id) {
  return prisma.servico.delete({ where: { id } });
}

import prisma from '../config/prisma.js';

export function createProfissional(data) {
  return prisma.profissional.create({ data });
}

export function findActiveProfissionais() {
  return prisma.profissional.findMany({ where: { ativo: true } });
}

export function updateProfissional(id, data) {
  return prisma.profissional.update({ where: { id }, data });
}

import prisma from '../config/prisma.js';

export function createProfissional(data) {
  return prisma.profissional.create({ data });
}

export function findAllProfissionais() {
  return prisma.profissional.findMany({ orderBy: { nome: 'asc' } });
}

export function findProfissionalById(id) {
  return prisma.profissional.findUnique({ where: { id } });
}

export function updateProfissional(id, data) {
  return prisma.profissional.update({ where: { id }, data });
}

export function deleteProfissional(id) {
  return prisma.profissional.delete({ where: { id } });
}

import prisma from '../config/prisma.js';

export function createSala(data) {
  return prisma.sala.create({ data });
}

export function findAllSalas() {
  return prisma.sala.findMany();
}

export function findSalaById(id) {
  return prisma.sala.findUnique({ where: { id } });
}

export function updateSala(id, data) {
  return prisma.sala.update({ where: { id }, data });
}

export function deleteSala(id) {
  return prisma.sala.delete({ where: { id } });
}

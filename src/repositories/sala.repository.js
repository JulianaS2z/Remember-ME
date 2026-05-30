import prisma from '../config/prisma.js';

export function createSala(data) {
  return prisma.sala.create({ data });
}

export function findAllSalas() {
  return prisma.sala.findMany();
}

export function deleteSala(id) {
  return prisma.sala.delete({ where: { id } });
}

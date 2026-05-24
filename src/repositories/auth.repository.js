import prisma from '../config/prisma.js';

export function findUserByEmail(email) {
  return prisma.usuario.findUnique({ where: { email } });
}

export function findUserById(id) {
  return prisma.usuario.findUnique({ where: { id } });
}

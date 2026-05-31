import prisma from '../config/prisma.js'

export function findUserByEmail(email) {
  return prisma.usuario.findUnique({ where: { email } })
}

export function findUserById(id) {
  return prisma.usuario.findUnique({ where: { id } })
}

export function updateUser(id, payload) {
  return prisma.usuario.update({ where: { id }, data: payload })
}

export function updateUserPassword(id, hashedPassword) {
  return prisma.usuario.update({ where: { id }, data: { senha: hashedPassword } })
}

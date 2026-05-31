import prisma from '../config/prisma.js';

export function createCliente(data) {
  return prisma.cliente.create({ data });
}

export function findAllClientes() {
  return prisma.cliente.findMany();
}

export function findClienteById(id) {
  return prisma.cliente.findUnique({ where: { id } });
}

export function updateCliente(id, data) {
  return prisma.cliente.update({ where: { id }, data });
}

export function deleteCliente(id) {
  return prisma.cliente.delete({ where: { id } });
}

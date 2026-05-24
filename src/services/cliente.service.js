import * as clienteRepo from '../repositories/cliente.repository.js';

export async function criarClienteService(data) {
  return clienteRepo.createCliente({
    ...data,
    nascimento: new Date(data.nascimento),
    status: data.status || 'ativo'
  });
}

export async function listarClientesService() {
  return clienteRepo.findAllClientes();
}

export async function atualizarClienteService(id, data) {
  const updated = { ...data };
  if (updated.nascimento) updated.nascimento = new Date(updated.nascimento);
  return clienteRepo.updateCliente(id, updated);
}

export async function deletarClienteService(id) {
  return clienteRepo.deleteCliente(id);
}

export async function alterarStatusClienteService(id, status) {
  return clienteRepo.updateCliente(id, { status });
}

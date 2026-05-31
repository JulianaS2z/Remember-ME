import * as clienteRepo from '../repositories/cliente.repository.js';

function normalizeClientePayload(data) {
  const payload = { ...data };

  if (payload.dataNascimento) {
    payload.nascimento = new Date(payload.dataNascimento);
    delete payload.dataNascimento;
  }

  if (payload.nascimento) {
    payload.nascimento = new Date(payload.nascimento);
  }

  return payload;
}

function formatCliente(cliente) {
  if (!cliente) return cliente;

  return {
    ...cliente,
    dataNascimento: cliente.nascimento ? cliente.nascimento.toISOString().slice(0, 10) : null,
  };
}

export async function criarClienteService(data) {
  const payload = normalizeClientePayload({
    ...data,
    status: data.status || 'Ativo'
  });

  const cliente = await clienteRepo.createCliente(payload);
  return formatCliente(cliente);
}

export async function listarClientesService() {
  const clientes = await clienteRepo.findAllClientes();
  return clientes.map(formatCliente);
}

export async function buscarClienteService(id) {
  const cliente = await clienteRepo.findClienteById(id);
  return formatCliente(cliente);
}

export async function atualizarClienteService(id, data) {
  const payload = normalizeClientePayload(data);
  const cliente = await clienteRepo.updateCliente(id, payload);
  return formatCliente(cliente);
}

export async function deletarClienteService(id) {
  return clienteRepo.deleteCliente(id);
}

export async function alterarStatusClienteService(id, status) {
  const cliente = await clienteRepo.updateCliente(id, { status });
  return formatCliente(cliente);
}

import {
  criarClienteService,
  listarClientesService,
  buscarClienteService,
  atualizarClienteService,
  deletarClienteService,
  alterarStatusClienteService,
} from '../services/cliente.service.js'

export async function criarCliente(req, res, next) {
  try {
    const novoCliente = await criarClienteService(req.body)
    return res.status(201).json(novoCliente)
  } catch (error) {
    return next(error)
  }
}

export async function listarClientes(req, res, next) {
  try {
    const clientes = await listarClientesService()
    return res.json(clientes)
  } catch (error) {
    return next(error)
  }
}

export async function buscarCliente(req, res, next) {
  try {
    const cliente = await buscarClienteService(req.params.id)
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' })
    return res.json(cliente)
  } catch (error) {
    return next(error)
  }
}

export async function atualizarCliente(req, res, next) {
  try {
    const cliente = await atualizarClienteService(req.params.id, req.body)
    return res.json(cliente)
  } catch (error) {
    return next(error)
  }
}

export async function deletarCliente(req, res, next) {
  try {
    await deletarClienteService(req.params.id)
    return res.json({ mensagem: 'Cliente deletado com sucesso' })
  } catch (error) {
    return next(error)
  }
}

export async function alterarStatusCliente(req, res, next) {
  try {
    const cliente = await alterarStatusClienteService(req.params.id, req.body.status)
    return res.json(cliente)
  } catch (error) {
    return next(error)
  }
}

import { criarClienteService, listarClientesService, atualizarClienteService, deletarClienteService, alterarStatusClienteService } from '../services/cliente.service.js';

export async function criarCliente(req, res) {
  try {
    const novoCliente = await criarClienteService(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar cliente', detalhes: error.message });
  }
}

export async function listarClientes(req, res) {
  try {
    const clientes = await listarClientesService();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar clientes', detalhes: error.message });
  }
}

export async function atualizarCliente(req, res){
  const { id } = req.params;

  try { 
    const cliente = await atualizarClienteService(id, req.body);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente', detalhes: error.message });
  }
}

export async function deletarCliente(req, res) {
  const { id } = req.params;

  try {
    await deletarClienteService(id);
    res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar cliente', detalhes: error.message });
  }
}

export async function alterarStatusCliente(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const cliente = await alterarStatusClienteService(id, status);

    res.json(cliente);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao alterar status' });
  }
}
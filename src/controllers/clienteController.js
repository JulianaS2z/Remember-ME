import prisma from '../db.js';

export async function criarCliente(req, res) {
  try {
    const { nome, email, telefone, nascimento, status } = req.body;
    
    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        telefone,
        nascimento: new Date(nascimento),
        status: status || 'ativo'
      }
    });
    
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar cliente', detalhes: error.message });
  }
}

export async function listarClientes(req, res) {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar clientes', detalhes: error.message });
  }
}

export async function atualizarCliente(req, res){
  const { id } = req.params;
  const { nome, email, telefone, nascimento, status } = req.body;

  try { 
    const cliente = await prisma.cliente.update({
      where: { id },
      data: {
        nome,
        email,
        telefone,
        nascimento: new Date(nascimento),
        status
      }
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente', detalhes: error.message });
  }
}

export async function deletarCliente(req, res) {
  const { id } = req.params;

  try {
    await prisma.cliente.delete({
      where: { id }
    });
    res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar cliente', detalhes: error.message });
  }
}

export async function alterarStatusCliente(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const cliente = await prisma.cliente.update({
      where: { id },
      data: { status }
    });

    res.json(cliente);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao alterar status' });
  }
}
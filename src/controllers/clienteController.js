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
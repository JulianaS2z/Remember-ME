import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const criarProfissional = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;

    const profissional = await prisma.profissional.create({
      data: {
        nome,
        email,
        telefone
      }
    });

    res.status(201).json(profissional);

  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    res.status(400).json({ erro: 'Erro ao criar profissional' });
  }
};

export const listarProfissionais = async (req, res) => {
  try {
    const profissionais = await prisma.profissional.findMany({
      where: { ativo: true }
    });

    res.json(profissionais);

  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao listar profissionais' });
  }
};


export const atualizarProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    const profissional = await prisma.profissional.update({
      where: { id },
      data: {
        nome,
        email,
        telefone
      }
    });

    res.json(profissional);

  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao atualizar profissional' });
  }
};


export const desativarProfissional = async (req, res) => {
  try {
    const { id } = req.params;

    const profissional = await prisma.profissional.update({
      where: { id },
      data: { ativo: false }
    });

    res.json({
      mensagem: 'Profissional desativado com sucesso',
      profissional
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao desativar profissional' });
  }
};

export const ativarProfissional = async (req, res) => {
  try {
    const { id } = req.params;

    const profissional = await prisma.profissional.update({
      where: { id },
      data: { ativo: true }
    });

    res.json({
      mensagem: 'Profissional ativado com sucesso',
      profissional
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao ativar profissional' });
  }
};
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const criarServico = async (req, res) => {
  try {
    const { nome, duracaoMin, preco } = req.body;

    const novoServico = await prisma.servico.create({
        data: {
            nome,
            duracaoMin,
            preco
        }
    });

    res.status(201).json(novoServico);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    res.status(500).json({ error: 'Erro ao criar serviço' });
  }
};

export const listarServicos = async (req, res) => {
  try {
    const servicos = await prisma.servico.findMany();

    res.json(servicos);

    } catch (error) {
        console.error('Erro ao listar serviços:', error);
        res.status(500).json({ error: 'Erro ao listar serviços' });
    }
};

export const deletarServico = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.servico.delete({
      where: { id }
    });
    res.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    res.status(500).json({ error: 'Erro ao deletar serviço' });
  }
};

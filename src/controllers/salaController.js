import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const criarSala = async (req, res) => {
    try {
        const { nome } = req.body;
        const sala = await prisma.sala.create({
            data: { nome }
        });

        res.status(201).json(sala);

    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar sala" });
    }
};

export const listarSalas = async (req, res) => {
    try {
        const salas = await prisma.sala.findMany();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar salas" });
    }
};

export const deletarSala = async (req, res) => {
    try {
        const { id } = req.params;
        const sala = await prisma.sala.delete({
            where: { id }
        });
        res.json(sala);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar sala" });
    }
};

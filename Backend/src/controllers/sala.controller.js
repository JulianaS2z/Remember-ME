import { criarSalaService, listarSalasService, buscarSalaService, atualizarSalaService, deletarSalaService } from '../services/sala.service.js';

export const criarSala = async (req, res) => {
    try {
        const { nome } = req.body;
        const sala = await criarSalaService({ nome });
        res.status(201).json(sala);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar sala' });
    }
};

export const listarSalas = async (req, res) => {
    try {
        const salas = await listarSalasService();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar salas' });
    }
};

export const buscarSala = async (req, res) => {
    try {
        const { id } = req.params;
        const sala = await buscarSalaService(id);
        res.json(sala);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar sala' });
    }
};

export const atualizarSala = async (req, res) => {
    try {
        const { id } = req.params;
        const sala = await atualizarSalaService(id, req.body);
        res.json(sala);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar sala' });
    }
};

export const deletarSala = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sala = await deletarSalaService(id);
        res.json(sala);
    } catch (error) {
        next(error);
    }
};

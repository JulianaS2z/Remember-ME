import { criarAgendamentoService, listarAgendamentosService, cancelarAgendamentoService } from '../services/agendamento.service.js';

export const criarAgendamento = async (req, res) => {
    try {
        const agendamento = await criarAgendamentoService(req.body);
        res.status(201).json(agendamento);
    } catch (error) {
        console.error(error);
        res.status(400).json({ erro: error.message || 'Erro ao criar agendamento' });
    }
};

export const listarAgendamentos = async (req, res) => {
    try {
        const agendamentos = await listarAgendamentosService();
        res.json(agendamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao listar agendamentos' });
    }
};

export const cancelarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        const agendamento = await cancelarAgendamentoService(id);
        res.json({ mensagem: 'Agendamento cancelado', agendamento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao cancelar agendamento' });
    }
};
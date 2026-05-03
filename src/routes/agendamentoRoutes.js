import express from 'express';
import {criarAgendamento, 
listarAgendamentos,
cancelarAgendamento } from '../controllers/agendamentoController.js';

const router = express.Router();

router.post('/', criarAgendamento);
router.get('/', listarAgendamentos);
router.patch('/:id/cancelar',cancelarAgendamento);

export default router;
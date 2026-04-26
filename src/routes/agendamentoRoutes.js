import express from 'express';
import {criarAgendamento, listarAgendamentos} from '../controllers/agenamentoController.js';

const router = express.Router();

router.post('/agendamentos', criarAgendamento);
router.get('/agendamentos', listarAgendamentos);

export default router;
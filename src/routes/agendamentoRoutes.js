import express from 'express';
import { criarAgendamento, listarAgendamentos, cancelarAgendamento } from '../controllers/agendamento.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { criarAgendamentoSchema } from '../validators/agendamento.validator.js';

const router = express.Router();

router.get('/', authMiddleware, listarAgendamentos);
router.post('/', authMiddleware, validate(criarAgendamentoSchema), criarAgendamento);
router.patch('/:id/cancelar', authMiddleware, cancelarAgendamento);

export default router;
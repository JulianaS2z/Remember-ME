import express from 'express'
import {
  criarAgendamento,
  listarAgendamentos,
  buscarAgendamento,
  atualizarAgendamento,
  deletarAgendamento,
  alterarStatusAgendamento,
  cancelarAgendamento,
} from '../controllers/agendamento.controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { agendamentoSchema } from '../validators/agendamento.validator.js'

const router = express.Router()

router.get('/', authMiddleware, listarAgendamentos)
router.get('/:id', authMiddleware, buscarAgendamento)
router.post('/', authMiddleware, validate(agendamentoSchema), criarAgendamento)
router.put('/:id', authMiddleware, validate(agendamentoSchema), atualizarAgendamento)
router.delete('/:id', authMiddleware, deletarAgendamento)
router.patch('/:id/status', authMiddleware, alterarStatusAgendamento)
router.patch('/:id/cancelar', authMiddleware, cancelarAgendamento)

export default router
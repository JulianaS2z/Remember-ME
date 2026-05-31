import express from 'express';
import { criarServico, listarServicos, buscarServico, atualizarServico, deletarServico } from '../controllers/servico.controller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { criarServicoSchema, atualizarServicoSchema } from '../validators/servico.validator.js';

const router = express.Router();

router.post('/', authMiddleware, validate(criarServicoSchema), criarServico);
router.get('/', authMiddleware, listarServicos);
router.get('/:id', authMiddleware, buscarServico);
router.put('/:id', authMiddleware, validate(atualizarServicoSchema), atualizarServico);
router.delete('/:id', authMiddleware, deletarServico);

export default router;
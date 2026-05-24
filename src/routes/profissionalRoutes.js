import express from 'express';
import {
  criarProfissional,
  listarProfissionais,
  atualizarProfissional,
  desativarProfissional,
  ativarProfissional
} from '../controllers/profissional.controller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { criarProfissionalSchema, atualizarProfissionalSchema } from '../validators/profissional.validator.js';

const router = express.Router();

router.post('/', authMiddleware, validate(criarProfissionalSchema), criarProfissional);
router.get('/', authMiddleware, listarProfissionais);
router.put('/:id', authMiddleware, validate(atualizarProfissionalSchema), atualizarProfissional);
router.patch('/:id/inativar', authMiddleware, desativarProfissional);
router.patch('/:id/ativar', authMiddleware, ativarProfissional);

export default router;
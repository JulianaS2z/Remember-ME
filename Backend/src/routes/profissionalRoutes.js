import express from 'express';
import {
  criarProfissional,
  listarProfissionais,
  buscarProfissional,
  atualizarProfissional,
  alterarStatusProfissional,
  deletarProfissional
} from '../controllers/profissional.controller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { criarProfissionalSchema, atualizarProfissionalSchema } from '../validators/profissional.validator.js';

const router = express.Router();

router.post('/', authMiddleware, validate(criarProfissionalSchema), criarProfissional);
router.get('/', authMiddleware, listarProfissionais);
router.get('/:id', authMiddleware, buscarProfissional);
router.put('/:id', authMiddleware, validate(atualizarProfissionalSchema), atualizarProfissional);
router.patch('/:id/status', authMiddleware, alterarStatusProfissional);
router.delete('/:id', authMiddleware, deletarProfissional);

export default router;
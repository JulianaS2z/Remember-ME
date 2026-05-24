import express from 'express';
import { criarSala, listarSalas, deletarSala } from '../controllers/sala.controller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { criarSalaSchema } from '../validators/sala.validator.js';

const router = express.Router();

router.post('/', authMiddleware, validate(criarSalaSchema), criarSala);
router.get('/', authMiddleware, listarSalas);
router.delete('/:id', authMiddleware, deletarSala);

export default router;
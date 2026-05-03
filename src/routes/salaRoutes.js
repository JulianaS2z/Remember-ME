import express from 'express';
import { criarSala, listarSalas, deletarSala } from '../controllers/salaController.js';

const router = express.Router();

router.post('/', criarSala);
router.get('/', listarSalas);
router.delete('/:id', deletarSala);

export default router;
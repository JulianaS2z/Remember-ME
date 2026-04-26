import express from 'express';
import {criarProfissional, listarProfissionais} from '../controllers/profissionalcontroller.js';

const router = express.Router();

router.post('/profissionais', criarProfissional);
router.get('/profissionais', listarProfissionais);

export default router;
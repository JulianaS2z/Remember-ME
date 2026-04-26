import express from 'express';
import {criarServico, listarServicos} from '../controllers/servicoControler.js';

const router = express.Router();

router.post('/servicos', criarServico);
router.get('/servicos', listarServicos);

export default router;
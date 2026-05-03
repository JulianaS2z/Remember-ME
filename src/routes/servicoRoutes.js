import express from 'express';
import { criarServico,
listarServicos, 
deletarServico} from '../controllers/servicoControler.js';

const router = express.Router();

router.post('/', criarServico);
router.get('/', listarServicos);
router.delete('/:id', deletarServico);

export default router;
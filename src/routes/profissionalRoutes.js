import express from 'express';
import {
  criarProfissional,
  listarProfissionais,
  atualizarProfissional,
  desativarProfissional,
  ativarProfissional
} from '../controllers/profissionalController.js';

const router = express.Router();

router.post('/', criarProfissional);
router.get('/', listarProfissionais);
router.put('/:id', atualizarProfissional);
router.patch('/:id/inativar', desativarProfissional);
router.patch('/:id/ativar', ativarProfissional);

export default router;
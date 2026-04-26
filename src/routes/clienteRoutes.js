import express from 'express';
import { criarCliente, listarClientes,atualizarCliente, deletarCliente, alterarStatusCliente } from '../controllers/clienteController.js';

const router = express.Router();

router.post('/', criarCliente);
router.get('/', listarClientes);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);
router.patch('/:id/status', alterarStatusCliente);

export default router;
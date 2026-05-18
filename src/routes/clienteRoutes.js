import express from 'express';
import { criarCliente, 
listarClientes,
atualizarCliente, 
deletarCliente, 
alterarStatusCliente } from '../controllers/clienteController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, criarCliente);
router.get('/', authMiddleware, listarClientes);
router.put('/:id', authMiddleware, atualizarCliente);
router.delete('/:id', authMiddleware, deletarCliente);
router.patch('/:id/status', authMiddleware, alterarStatusCliente);

export default router;
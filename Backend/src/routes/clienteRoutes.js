import express from 'express';
import { criarCliente, listarClientes, buscarCliente, atualizarCliente, deletarCliente, alterarStatusCliente } from '../controllers/cliente.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { criarClienteSchema, atualizarClienteSchema } from '../validators/cliente.validator.js';
const router = express.Router();

router.post('/', authMiddleware, validate(criarClienteSchema), criarCliente);
router.get('/', authMiddleware, listarClientes);
router.get('/:id', authMiddleware, buscarCliente);
router.put('/:id', authMiddleware, validate(atualizarClienteSchema), atualizarCliente);
router.delete('/:id', authMiddleware, deletarCliente);
router.patch('/:id/status', authMiddleware, alterarStatusCliente);

export default router;

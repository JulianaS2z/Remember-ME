import express from 'express';
import {criarCliente, listarClientes} from '../controllers/clienteController.js';

const router = express.Router();

router.post('/clientes', criarCliente);
router.get('/clientes', listarClientes);

export default router;
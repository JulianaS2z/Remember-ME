import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { env, validateEnv } from './config/env.js';

import clienteRoutes from './routes/clienteRoutes.js'
import profissionalRoutes from './routes/profissionalRoutes.js'
import servicoRoutes from './routes/servicoRoutes.js'
import agendamentoRoutes from './routes/agendamentoRoutes.js'
import salaRoutes from './routes/salaRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import { errorHandler, notFound } from './middleware/error.middleware.js';

validateEnv()

const app = express();

const corsOptions = env.nodeEnv === 'development'
  ? { origin: true, credentials: true }
  : { origin: env.frontendUrl, credentials: true }

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', function (req, res) {
  res.json({ status: 'API rodando' });
});

app.use('/api/clientes', clienteRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/salas', salaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Servidor rodando em http://localhost:${env.port}`);
});

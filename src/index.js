import express from 'express';

import clienteRoutes from './routes/clienteRoutes.js'
// import profissionalRoutes from './routes/profissionalRoutes.js'
// import servicoRoutes from './routes/servicoRoutes.js'
// import agendamentoRoutes from './routes/agendamentoRoutes.js'

const app = express();

app.use(express.json());

   app.get('/', function (req, res) { 
    res.json('API rodando');
//      console.log('usuário acessou a rota inicial');
 });
 
app.use('/clientes', clienteRoutes);
// app.use('/profissionais', profissionalRoutes);
// app.use('/servicos', servicoRoutes);
// app.use('/agendamentos', agendamentoRoutes);
 

//  app.get('/user', async function (req, res) { 
   
//      res.json('Rota user');
//  });
 app.listen(3000, () => {
     console.log('Servidor rodando em http://localhost:3000');
 });
import express from 'express';
import { PrismaClient } from './generated/prisma/index.js'
const app = express();
const prisma = new PrismaClient(); 


app.use(express.json());

app.get('/', function (req, res) { 
    res.json('Rota inicial');
    console.log('usuário acessou a rota inicial');
});

app.get('/user', async function (req, res) { 
   
    res.json('Rota user');
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
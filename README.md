# Remember Me

Sistema web de gestão e agendamento para estúdio fotográfico, desenvolvido como adaptação da proposta AgendaFácil. O projeto permite administrar clientes, profissionais, serviços fotográficos, salas/estúdios e agendamentos, com autenticação, dashboard e validação de conflitos de horário.

## Objetivo

O Remember Me foi criado para resolver a organização da agenda de um estúdio fotográfico. A aplicação centraliza os principais cadastros do negócio e impede que dois agendamentos ocupem o mesmo profissional ou a mesma sala no mesmo horário.

Este projeto foi desenvolvido para apresentação acadêmica e portfólio profissional, usando uma arquitetura full stack com API REST, banco relacional e interface React.

## Como funciona

O Remember Me funciona como um sistema completo de gestão de agenda:

- Usuários fazem login no frontend React e recebem um token JWT.
- O frontend envia requisições à API Express em `/api`, usando o token no header `Authorization`.
- A API valida o token e processa os dados usando Prisma para acessar o banco PostgreSQL.
- Cada agendamento reúne cliente, profissional, sala, serviço, data, hora de início e status.
- O horário de fim do agendamento é calculado automaticamente pela duração do serviço.
- Antes de criar ou editar um agendamento, o sistema valida se já existe conflito de horário:
  - o mesmo profissional não pode ter dois agendamentos ativos no mesmo horário
  - a mesma sala não pode estar em dois agendamentos ativos no mesmo horário
- Agendamentos com status `Cancelado` não bloqueiam novos horários.

## Funcionalidades

- Login com autenticação JWT
- Logout com limpeza do token no frontend
- Rotas protegidas no React
- Cadastro, listagem, edição e exclusão de clientes
- Cadastro, listagem, edição e exclusão de profissionais
- Ativação e inativação de profissionais
- Cadastro, listagem, edição e exclusão de serviços
- Cadastro, listagem, edição e exclusão de salas
- Criação, edição, listagem, cancelamento e exclusão de agendamentos
- Validação de conflito de horário por profissional
- Validação de conflito de horário por sala
- Dashboard com indicadores do estúdio
- Comunicação completa entre React, API Express, Prisma e PostgreSQL

## Tecnologias

### Back-end

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs
- Joi
- CORS
- dotenv

### Front-end

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Recharts
- React Icons

## Estrutura do Projeto

```txt
Remember-ME/
├── Backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── styles/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## Modelo de Dados

O sistema trabalha com as seguintes entidades principais:

- `Usuario`: usuários que acessam o sistema.
- `Cliente`: clientes do estúdio fotográfico.
- `Profissional`: fotógrafos ou profissionais responsáveis pelos atendimentos.
- `Servico`: tipos de serviços oferecidos, como ensaio, evento, formatura ou casamento.
- `Sala`: espaços físicos do estúdio.
- `Agendamento`: reserva de cliente, profissional, serviço, sala, data, horário e status.

No agendamento, o sistema relaciona:

```txt
clienteId
profissionalId
salaId
servicoId
inicio
fim
status
```

Essa modelagem é adequada para estúdio fotográfico porque controla tanto a disponibilidade do profissional quanto a disponibilidade da sala.

## Regras de Negócio

- Um cliente pode ter vários agendamentos.
- Um profissional pode ter vários agendamentos.
- Uma sala pode ter vários agendamentos.
- Um serviço pode aparecer em vários agendamentos.
- Um profissional inativo não deve receber novos agendamentos.
- Dois agendamentos ativos não podem usar o mesmo profissional no mesmo horário.
- Dois agendamentos ativos não podem usar a mesma sala no mesmo horário.
- Agendamentos com status `Cancelado` não bloqueiam novos horários.
- O horário final do agendamento é calculado pela duração do serviço.

## Como Executar

### 1. Clonar ou abrir o projeto

Abra a pasta principal:

```bash
Remember-ME/
```

### 2. Configurar o back-end

Entre na pasta da API:

```bash
cd Backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`:

```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/remember_me?schema=public"
JWT_SECRET="troque-por-uma-chave-segura-com-mais-de-16-caracteres"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie a API:

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3000/api
```

### 3. Configurar o front-end

Em outro terminal, entre na pasta do frontend:

```bash
cd Frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
```

Inicie o frontend:

```bash
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173
```

## Principais Rotas da API

Todas as rotas abaixo, exceto login, exigem token JWT no header:

```txt
Authorization: Bearer SEU_TOKEN
```

### Autenticação

```txt
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
PUT  /api/auth/profile
PUT  /api/auth/change-password
```

### Clientes

```txt
GET    /api/clientes
GET    /api/clientes/:id
POST   /api/clientes
PUT    /api/clientes/:id
PATCH  /api/clientes/:id/status
DELETE /api/clientes/:id
```

### Profissionais

```txt
GET    /api/profissionais
GET    /api/profissionais/:id
POST   /api/profissionais
PUT    /api/profissionais/:id
PATCH  /api/profissionais/:id/status
DELETE /api/profissionais/:id
```

### Serviços

```txt
GET    /api/servicos
GET    /api/servicos/:id
POST   /api/servicos
PUT    /api/servicos/:id
DELETE /api/servicos/:id
```

### Salas

```txt
GET    /api/salas
GET    /api/salas/:id
POST   /api/salas
PUT    /api/salas/:id
DELETE /api/salas/:id
```

### Agendamentos

```txt
GET    /api/agendamentos
GET    /api/agendamentos/:id
POST   /api/agendamentos
PUT    /api/agendamentos/:id
PATCH  /api/agendamentos/:id/status
PATCH  /api/agendamentos/:id/cancelar
DELETE /api/agendamentos/:id
```

### Dashboard

```txt
GET /api/dashboard/stats
```

## Exemplos para Postman

### Login

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@email.com",
  "senha": "123456"
}
```

### Criar Cliente

```http
POST http://localhost:3000/api/clientes
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Ana Silva",
  "email": "ana@email.com",
  "telefone": "11999999999",
  "dataNascimento": "2000-05-20",
  "status": "Ativo"
}
```

### Criar Profissional

```http
POST http://localhost:3000/api/profissionais
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Julia Fotografia",
  "email": "julia@rememberme.com",
  "telefone": "11988888888",
  "ativo": true
}
```

### Criar Serviço

```http
POST http://localhost:3000/api/servicos
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Ensaio Fotográfico",
  "duracao": 120,
  "preco": 800
}
```

### Criar Sala

```http
POST http://localhost:3000/api/salas
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Estúdio Principal"
}
```

### Criar Agendamento

```http
POST http://localhost:3000/api/agendamentos
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "clienteId": "ID_DO_CLIENTE",
  "profissionalId": "ID_DO_PROFISSIONAL",
  "salaId": "ID_DA_SALA",
  "servicoId": "ID_DO_SERVICO",
  "data": "2026-06-10",
  "horaInicio": "14:00",
  "status": "Confirmado"
}
```

### Testar Conflito de Horário

Repita a criação de agendamento usando o mesmo `profissionalId` ou a mesma `salaId`, na mesma data e horário.

Resposta esperada:

```json
{
  "erro": "Profissional já possui agendamento nesse horário"
}
```

ou:

```json
{
  "erro": "Sala já possui agendamento nesse horário"
}
```

## Checklist de Testes Obrigatórios

- [ ] Login
- [ ] Cadastro de cliente
- [ ] Edição de cliente
- [ ] Exclusão de cliente
- [ ] Cadastro de profissional
- [ ] Edição de profissional
- [ ] Inativação de profissional
- [ ] Cadastro de serviço
- [ ] Cadastro de sala
- [ ] Criação de agendamento
- [ ] Edição de agendamento
- [ ] Cancelamento de agendamento
- [ ] Validação de conflito de horário por profissional
- [ ] Validação de conflito de horário por sala
- [ ] Dashboard
- [ ] Proteção de rotas JWT
- [ ] Logout
- [ ] Integração completa Frontend ↔ Backend ↔ PostgreSQL

## Relação com a Proposta AgendaFácil

O Remember Me foi desenvolvido com base na ideia de um sistema genérico de agendamento de serviços, mas adaptado para o contexto de um estúdio fotográfico.

A proposta original previa cadastros de clientes, profissionais, serviços, agendamentos e usuários. O Remember Me mantém essa base e adiciona o controle de salas, uma necessidade real para estúdios que precisam reservar ambientes físicos para ensaios e sessões.

## Status do Projeto

Projeto em fase final de integração e validação, com backend, frontend, autenticação, CRUDs e dashboard estruturados.

## Autoria

Projeto acadêmico desenvolvido para fins de estudo
Desenvolvido por Juliana Evangelista
Orientadores: Prof. Roberto Carlos(backend) e Carlos Anderson(backend e frontend).
Projeto Acadêmico — 2026

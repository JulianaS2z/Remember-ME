# Remember Me Studio — Frontend

Sistema de gestão para estúdios fotográficos.

## Stack

- **React 18** + **Vite**
- **React Router DOM v6**
- **Axios** com interceptors JWT
- **Tailwind CSS** — dark theme customizado
- **Recharts** — gráficos
- **date-fns** — datas em PT-BR
- **React Icons** — ícones

## Estrutura

```
src/
├── components/        # Componentes reutilizáveis
│   ├── Sidebar/       # Navegação lateral fixa
│   ├── Header/        # Cabeçalho com título e ações
│   ├── Modal/         # Modal genérico com ESC e backdrop
│   ├── Loading/       # Spinner e tela de carregamento
│   ├── ProtectedRoute/
│   ├── ClienteForm/
│   ├── ProfissionalForm/
│   ├── ServicoForm/
│   ├── SalaForm/
│   └── AgendamentoForm/
├── pages/             # Telas da aplicação
├── services/          # Integração com API REST
├── context/           # AuthContext com JWT
├── hooks/             # useAuth
├── layouts/           # MainLayout / AuthLayout
├── routes/            # AppRoutes
└── styles/            # globals.css com Tailwind
```

## Setup

```bash
npm install
cp .env .env.local   # edite VITE_API_URL
npm run dev
```

## Variáveis de ambiente

| Variável        | Padrão                        | Descrição           |
|-----------------|-------------------------------|---------------------|
| `VITE_API_URL`  | `http://localhost:3000/api`   | URL base do backend |

## API esperada pelo frontend

### Auth
- `POST /auth/login` → `{ token, user }`
- `POST /auth/logout`
- `GET  /auth/profile`
- `PUT  /auth/profile`
- `PUT  /auth/change-password`

### Recursos (CRUD padrão)
- `/clientes` — GET, POST, GET/:id, PUT/:id, DELETE/:id, PATCH/:id/status
- `/profissionais` — GET, POST, GET/:id, PUT/:id, DELETE/:id, PATCH/:id/status
- `/servicos` — GET, POST, GET/:id, PUT/:id, DELETE/:id
- `/salas` — GET, POST, GET/:id, PUT/:id, DELETE/:id
- `/agendamentos` — GET, POST, GET/:id, PUT/:id, DELETE/:id, PATCH/:id/status

### Dashboard
- `GET /dashboard/stats` → `{ clientes, agendamentos, ensaios, receita, porMes[], porServico[] }`

## Status de agendamento

| Status     | Cor       |
|------------|-----------|
| Confirmado | Azul      |
| Pendente   | Âmbar     |
| Cancelado  | Vermelho  |
| Finalizado | Roxo      |

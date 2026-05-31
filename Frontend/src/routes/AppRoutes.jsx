import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx'

import Login from '../pages/Login/Login.jsx'
import Register from '../pages/Register/Register.jsx'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword.jsx'
import RequestAccess from '../pages/RequestAccess/RequestAccess.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'
import Clientes from '../pages/Clientes/Clientes.jsx'
import Profissionais from '../pages/Profissionais/Profissionais.jsx'
import Servicos from '../pages/Servicos/Servicos.jsx'
import Salas from '../pages/Salas/Salas.jsx'
import Agendamentos from '../pages/Agendamentos/Agendamentos.jsx'
import Perfil from '../pages/Perfil/Perfil.jsx'
import NotFound from '../pages/NotFound/NotFound.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/request-access" element={<RequestAccess />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/profissionais" element={<Profissionais />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/salas" element={<Salas />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

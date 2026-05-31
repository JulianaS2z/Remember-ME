import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import Loading from '../Loading/Loading.jsx'

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, initialized, user } = useAuth()

  if (!initialized) return <Loading fullscreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user?.perfil)) return <Navigate to="/" replace />

  return children
}

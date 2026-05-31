import { NavLink, useNavigate } from 'react-router-dom'
import {
  RiDashboardLine, RiUserLine, RiGroupLine, RiScissorsCutLine,
  RiDoorOpenLine, RiCalendarEventLine, RiUserSettingsLine, RiLogoutBoxLine,
  RiCameraLensLine
} from 'react-icons/ri'
import { useAuth } from '../../hooks/useAuth.js'

const navItems = [
  { to: '/', icon: RiDashboardLine, label: 'Dashboard' },
  { to: '/clientes', icon: RiUserLine, label: 'Clientes' },
  { to: '/profissionais', icon: RiGroupLine, label: 'Profissionais' },
  { to: '/servicos', icon: RiScissorsCutLine, label: 'Serviços' },
  { to: '/salas', icon: RiDoorOpenLine, label: 'Salas' },
  { to: '/agendamentos', icon: RiCalendarEventLine, label: 'Agendamentos' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-card border-r border-surface-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <RiCameraLensLine size={18} className="text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-slate-100 text-lg leading-none block">Remember Me</span>
            <span className="text-surface-subtle text-xs">Studio Premium</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive
                ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                : 'text-surface-subtle hover:text-slate-200 hover:bg-surface-hover'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-brand-400' : 'text-surface-muted group-hover:text-slate-300'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-surface-border space-y-1">
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
            ${isActive
              ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
              : 'text-surface-subtle hover:text-slate-200 hover:bg-surface-hover'
            }`
          }
        >
          <RiUserSettingsLine size={18} />
          Perfil
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-subtle hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <RiLogoutBoxLine size={18} />
          Sair
        </button>

        {/* User pill */}
        <div className="flex items-center gap-3 px-4 py-3 mt-2 bg-surface rounded-xl border border-surface-border">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold text-sm flex-shrink-0">
            {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-slate-200 text-sm font-medium truncate">{user?.nome || 'Usuário'}</p>
            <p className="text-surface-subtle text-xs truncate">{user?.email || ''}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col z-40 shadow-2xl shadow-slate-950/20">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <RiCameraLensLine size={18} className="text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-lg leading-none block">Remember Me</span>
            <span className="text-slate-400 text-xs">Studio Premium</span>
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
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-brand-500' : 'text-slate-500 group-hover:text-white'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
            ${isActive
              ? 'bg-white text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`
          }
        >
          <RiUserSettingsLine size={18} />
          Perfil
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          <RiLogoutBoxLine size={18} />
          Sair
        </button>

        {/* User pill */}
        <div className="flex items-center gap-3 px-4 py-3 mt-2 bg-white/5 rounded-xl border border-white/10">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.nome || 'Usuário'}</p>
            <p className="text-slate-400 text-xs truncate">{user?.email || ''}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

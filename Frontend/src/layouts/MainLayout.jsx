import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import Header from '../components/Header/Header.jsx'

const pageTitles = {
  '/': 'Dashboard',
  '/clientes': 'Clientes',
  '/profissionais': 'Profissionais',
  '/servicos': 'Serviços',
  '/salas': 'Salas',
  '/agendamentos': 'Agendamentos',
  '/perfil': 'Perfil',
}

export default function MainLayout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] || 'Remember Me'

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6 bg-[linear-gradient(180deg,#F8FAFC_0%,#EEF4FF_100%)]">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

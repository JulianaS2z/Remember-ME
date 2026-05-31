import { Link } from 'react-router-dom'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="text-center">
        <p className="font-display font-bold text-[120px] leading-none text-brand-500/20">404</p>
        <h1 className="font-display font-bold text-3xl text-slate-100 mb-3 -mt-4">Página não encontrada</h1>
        <p className="text-surface-subtle mb-8">A página que você está procurando não existe.</p>
        <Link to="/" className="rm-btn-primary inline-flex">
          <RiArrowLeftLine size={18} />
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  )
}

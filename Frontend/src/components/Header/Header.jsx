import { RiBellLine, RiSearchLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/useAuth.js'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Header({ title }) {
  const { user } = useAuth()
  const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })

  return (
    <header className="h-16 bg-surface-card/50 backdrop-blur border-b border-surface-border flex items-center px-6 gap-4">
      {/* Title */}
      <div className="flex-1">
        <h1 className="font-display font-semibold text-slate-100 text-lg leading-none">{title}</h1>
        <p className="text-surface-subtle text-xs mt-0.5 capitalize">{today}</p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="p-2.5 text-surface-subtle hover:text-slate-200 hover:bg-surface-hover rounded-xl transition-colors">
          <RiSearchLine size={18} />
        </button>

        <button className="relative p-2.5 text-surface-subtle hover:text-slate-200 hover:bg-surface-hover rounded-xl transition-colors">
          <RiBellLine size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-surface-card" />
        </button>

        <div className="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold text-sm ml-1">
          {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  )
}

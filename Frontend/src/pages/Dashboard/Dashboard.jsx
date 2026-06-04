import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import {
  RiUserLine, RiCalendarEventLine, RiCameraLine, RiMoneyDollarCircleLine
} from 'react-icons/ri'
import api from '../../services/api.js'
import Loading from '../../components/Loading/Loading.jsx'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const STATUS_COLORS = {
  Confirmado: '#10B981',
  Pendente: '#F59E0B',
  Cancelado: '#EF4444',
  Finalizado: '#8B5CF6',
}

const PIE_COLORS = ['#3B82F6', '#0F172A', '#10B981', '#F59E0B', '#64748B']

function StatCard({ icon: Icon, label, value, sub, color = 'brand' }) {
  const colors = {
    brand: 'bg-brand-500/10 text-brand-600',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    amber: 'bg-amber-500/10 text-amber-600',
    purple: 'bg-slate-900 text-white',
  }
  return (
    <div className="rm-card p-6 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/80 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center`}>
          <Icon size={22} />
        </div>
      </div>
      <p className="text-surface-subtle text-sm font-medium mb-1">{label}</p>
      <p className="font-display font-bold text-3xl text-slate-100">{value}</p>
      {sub && <p className="text-emerald-600 text-xs font-medium mt-1">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [agendamentos, setAgendamentos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/dashboard/stats').catch(() => ({ data: null })),
      api.get('/agendamentos', { params: { limite: 6, status: 'Confirmado' } }).catch(() => ({ data: [] })),
    ]).then(([s, a]) => {
      setStats(s.data)
      const list = Array.isArray(a.data) ? a.data : a.data?.data || []
      setAgendamentos(list)
    }).finally(() => setLoading(false))
  }, [])

  // Fallback chart data if API not ready
  const chartData = stats?.porMes || [
    { mes: 'Jan', total: 12 }, { mes: 'Fev', total: 19 }, { mes: 'Mar', total: 15 },
    { mes: 'Abr', total: 25 }, { mes: 'Mai', total: 22 }, { mes: 'Jun', total: 30 },
  ]

  const pieData = stats?.porServico || [
    { name: 'Casamentos', value: 48 }, { name: 'Formaturas', value: 32 },
    { name: 'Ensaios', value: 28 }, { name: 'Corporativo', value: 18 },
  ]

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <div className="rm-card p-6 overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <p className="text-brand-600 text-sm font-semibold tracking-widest uppercase mb-2">Estúdio fotográfico premium</p>
            <h2 className="font-display font-bold text-3xl text-slate-100 mb-2">Central de gestão Remember Me</h2>
            <p className="text-surface-subtle max-w-2xl">
              Acompanhe clientes, ensaios, agenda e receita em uma visão limpa para decisões rápidas do estúdio.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 min-w-[320px]">
            {['Casamentos', 'Formaturas', 'Corporativo'].map((item) => (
              <div key={item} className="rounded-xl border border-surface-border bg-surface-hover px-4 py-3 text-center">
                <p className="text-xs text-surface-subtle">{item}</p>
                <p className="text-sm font-semibold text-slate-100 mt-1">Ativo</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={RiUserLine} label="Total de Clientes" value={stats?.clientes ?? '247'}  />
        <StatCard icon={RiCalendarEventLine} label="Agendamentos do Mês" value={stats?.agendamentos ?? '34'} color="emerald" />
        <StatCard icon={RiCameraLine} label="Ensaios Realizados" value={stats?.ensaios ?? '156'} color="purple" />
        <StatCard icon={RiMoneyDollarCircleLine} label="Receita Prevista" value={stats?.receita ?? 'R$ 48.5k'} color="amber" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Bar chart */}
        <div className="lg:col-span-2 rm-card p-6">
          <h2 className="font-display font-semibold text-slate-100 mb-6">Agendamentos por Mês</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="mes" stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, color: '#0F172A', boxShadow: '0 16px 40px rgba(15, 23, 42, .12)' }}
                cursor={{ fill: '#EEF4FF', radius: 4 }}
              />
              <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="rm-card p-6">
          <h2 className="font-display font-semibold text-slate-100 mb-6">Serviços Populares</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, color: '#0F172A', boxShadow: '0 16px 40px rgba(15, 23, 42, .12)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-sm text-surface-subtle">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-300">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming sessions */}
      <div className="rm-card p-6">
        <h2 className="font-display font-semibold text-slate-100 mb-5">Próximos Agendamentos</h2>
        {agendamentos.length === 0 ? (
          <p className="text-surface-subtle text-sm">Nenhum agendamento próximo.</p>
        ) : (
          <div className="space-y-3">
            {agendamentos.slice(0, 5).map((ag) => (
              <div key={ag.id} className="flex items-center gap-4 p-4 bg-surface-hover rounded-xl border border-surface-border hover:bg-white hover:shadow-sm transition-all">
                <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ background: STATUS_COLORS[ag.status] || '#2563EB' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-200 truncate">{ag.cliente?.nome || ag.cliente || '—'}</p>
                  <p className="text-surface-subtle text-sm truncate">{ag.servico?.nome || ag.servico || '—'}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-slate-300 text-sm font-medium">{ag.data ? format(new Date(ag.data), 'dd/MM/yyyy', { locale: ptBR }) : '—'}</p>
                  <p className="text-surface-subtle text-xs">{ag.horaInicio || '—'}</p>
                </div>
                <span className={`rm-badge status-${(ag.status || '').toLowerCase()}`}>{ag.status || '—'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

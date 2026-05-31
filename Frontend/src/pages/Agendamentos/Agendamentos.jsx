import { useEffect, useState, useCallback } from 'react'
import {
  RiAddLine, RiArrowLeftSLine, RiArrowRightSLine,
  RiCalendarEventLine, RiListUnordered, RiEditLine, RiDeleteBinLine
} from 'react-icons/ri'
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import agendamentoService from '../../services/agendamentoService.js'
import Modal from '../../components/Modal/Modal.jsx'
import AgendamentoForm from '../../components/AgendamentoForm/AgendamentoForm.jsx'
import Loading from '../../components/Loading/Loading.jsx'

const STATUS_CONFIG = {
  Confirmado: { cls: 'bg-brand-500/80 text-white', dot: '#2563EB' },
  Pendente: { cls: 'bg-amber-500/80 text-white', dot: '#F59E0B' },
  Cancelado: { cls: 'bg-red-500/80 text-white', dot: '#EF4444' },
  Finalizado: { cls: 'bg-purple-500/80 text-white', dot: '#8B5CF6' },
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 7) // 7am–19pm

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [view, setView] = useState('semana') // semana | mes | dia | lista
  const [current, setCurrent] = useState(new Date())
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [filterStatus, setFilterStatus] = useState('Todos')

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const data = await agendamentoService.listar()
      setAgendamentos(Array.isArray(data) ? data : data?.data || [])
    } catch { setAgendamentos([]) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (a) => { setEditing(a); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = async (form) => {
    setSaving(true)
    try {
      if (editing) await agendamentoService.atualizar(editing.id, form)
      else await agendamentoService.criar(form)
      closeModal(); fetch()
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try { await agendamentoService.excluir(confirmDelete.id); setConfirmDelete(null); fetch() } catch {}
  }

  const handleStatus = async (a, status) => {
    try { await agendamentoService.alterarStatus(a.id, status); fetch() } catch {}
  }

  // Navigation
  const prev = () => {
    if (view === 'semana') setCurrent(d => subWeeks(d, 1))
    else if (view === 'mes') setCurrent(d => subMonths(d, 1))
    else setCurrent(d => addDays(d, -1))
  }
  const next = () => {
    if (view === 'semana') setCurrent(d => addWeeks(d, 1))
    else if (view === 'mes') setCurrent(d => addMonths(d, 1))
    else setCurrent(d => addDays(d, 1))
  }

  const filtered = agendamentos.filter(a => filterStatus === 'Todos' || a.status === filterStatus)

  // Week days
  const weekStart = startOfWeek(current, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getEventsForDay = (day) =>
    filtered.filter(a => {
      try { return isSameDay(parseISO(a.data), day) } catch { return false }
    })

  const timeToMinutes = (t) => {
    if (!t) return 0
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }

  // Title
  const titleMap = {
    semana: `${format(weekDays[0], 'd MMM', { locale: ptBR })} – ${format(weekDays[6], 'd MMM yyyy', { locale: ptBR })}`,
    mes: format(current, 'MMMM yyyy', { locale: ptBR }),
    dia: format(current, "EEEE, d 'de' MMMM", { locale: ptBR }),
    lista: 'Todos os Agendamentos',
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <button onClick={prev} className="p-2 text-surface-subtle hover:text-slate-200 hover:bg-surface-hover rounded-xl transition-colors"><RiArrowLeftSLine size={20} /></button>
          <span className="font-display font-semibold text-slate-100 min-w-[180px] text-center capitalize">{titleMap[view]}</span>
          <button onClick={next} className="p-2 text-surface-subtle hover:text-slate-200 hover:bg-surface-hover rounded-xl transition-colors"><RiArrowRightSLine size={20} /></button>
          <button onClick={() => setCurrent(new Date())} className="px-3 py-1.5 text-xs font-medium text-surface-subtle hover:text-slate-200 border border-surface-border hover:border-surface-muted rounded-lg transition-colors ml-1">Hoje</button>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
          {/* View switcher */}
          <div className="flex bg-surface-card border border-surface-border rounded-xl p-1 gap-1">
            {[['semana', 'Semana'], ['mes', 'Mês'], ['dia', 'Dia'], ['lista', 'Lista']].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${view === v ? 'bg-brand-500 text-white' : 'text-surface-subtle hover:text-slate-200'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 bg-surface-card border border-surface-border text-surface-subtle text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            {['Todos', 'Confirmado', 'Pendente', 'Cancelado', 'Finalizado'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <button onClick={openCreate} className="rm-btn-primary text-sm py-2">
            <RiAddLine size={16} /> Novo
          </button>
        </div>
      </div>

      {loading ? <Loading /> : (
        <>
          {/* WEEK VIEW */}
          {view === 'semana' && (
            <div className="rm-card overflow-hidden">
              {/* Day headers */}
              <div className="grid border-b border-surface-border" style={{ gridTemplateColumns: '56px repeat(7, 1fr)' }}>
                <div className="p-3 border-r border-surface-border" />
                {weekDays.map(day => {
                  const isToday = isSameDay(day, new Date())
                  return (
                    <div key={day} className={`p-3 text-center border-r border-surface-border last:border-r-0 ${isToday ? 'bg-brand-500/5' : ''}`}>
                      <p className="text-surface-subtle text-xs uppercase tracking-wider">{format(day, 'EEE', { locale: ptBR })}</p>
                      <p className={`font-display font-bold text-lg mt-0.5 ${isToday ? 'text-brand-400' : 'text-slate-200'}`}>{format(day, 'd')}</p>
                    </div>
                  )
                })}
              </div>

              {/* Time grid */}
              <div className="overflow-y-auto max-h-[560px]">
                {HOURS.map(hour => (
                  <div key={hour} className="grid border-b border-surface-border last:border-b-0" style={{ gridTemplateColumns: '56px repeat(7, 1fr)', minHeight: 64 }}>
                    <div className="p-2 border-r border-surface-border flex items-start justify-end pr-3 pt-2">
                      <span className="text-surface-subtle text-xs">{String(hour).padStart(2, '0')}:00</span>
                    </div>
                    {weekDays.map(day => {
                      const events = getEventsForDay(day).filter(a => {
                        const h = parseInt(a.horaInicio?.split(':')[0] || '0')
                        return h === hour
                      })
                      return (
                        <div key={day} className={`border-r border-surface-border last:border-r-0 p-1 min-h-[64px] ${isSameDay(day, new Date()) ? 'bg-brand-500/5' : ''}`}>
                          {events.map(a => {
                            const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG.Pendente
                            return (
                              <div
                                key={a.id}
                                onClick={() => openEdit(a)}
                                className={`cal-event mb-1 ${cfg.cls} opacity-90 hover:opacity-100`}
                              >
                                <p className="font-semibold text-xs truncate">{a.cliente?.nome || a.cliente || '—'}</p>
                                <p className="text-xs opacity-80 truncate">{a.servico?.nome || a.servico || ''}</p>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DAY VIEW */}
          {view === 'dia' && (
            <div className="rm-card overflow-hidden">
              <div className="border-b border-surface-border p-4 text-center">
                <p className="font-display font-bold text-slate-100 capitalize">{format(current, "EEEE, d 'de' MMMM", { locale: ptBR })}</p>
              </div>
              <div className="overflow-y-auto max-h-[560px]">
                {HOURS.map(hour => {
                  const events = getEventsForDay(current).filter(a => parseInt(a.horaInicio?.split(':')[0] || '0') === hour)
                  return (
                    <div key={hour} className="flex border-b border-surface-border last:border-b-0 min-h-[64px]">
                      <div className="w-16 flex-shrink-0 flex items-start justify-end pr-3 pt-2 border-r border-surface-border">
                        <span className="text-surface-subtle text-xs">{String(hour).padStart(2, '0')}:00</span>
                      </div>
                      <div className="flex-1 p-2 space-y-1">
                        {events.map(a => {
                          const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG.Pendente
                          return (
                            <div key={a.id} onClick={() => openEdit(a)} className={`cal-event ${cfg.cls} flex items-center gap-2`}>
                              <span className="font-semibold">{a.horaInicio} – {a.horaFim || '?'}</span>
                              <span>{a.cliente?.nome || a.cliente}</span>
                              <span className="opacity-70">{a.servico?.nome || a.servico}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* MONTH VIEW */}
          {view === 'mes' && (
            <div className="rm-card overflow-hidden">
              <div className="grid grid-cols-7 border-b border-surface-border">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
                  <div key={d} className="p-3 text-center text-xs font-semibold text-surface-subtle uppercase tracking-wider border-r border-surface-border last:border-r-0">{d}</div>
                ))}
              </div>
              <MonthGrid current={current} events={filtered} onEdit={openEdit} />
            </div>
          )}

          {/* LIST VIEW */}
          {view === 'lista' && (
            <div className="rm-card">
              {filtered.length === 0 && <p className="text-center py-12 text-surface-subtle">Nenhum agendamento encontrado.</p>}
              <div className="divide-y divide-surface-border">
                {filtered.map(a => {
                  const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG.Pendente
                  return (
                    <div key={a.id} className="flex items-center gap-4 p-5 hover:bg-surface/50 transition-colors">
                      <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-200 truncate">{a.cliente?.nome || a.cliente || '—'}</p>
                        <p className="text-surface-subtle text-sm truncate">{a.servico?.nome || a.servico || '—'} · {a.sala?.nome || a.sala || ''}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-slate-300 text-sm font-medium">{a.data ? format(parseISO(a.data), 'dd/MM/yyyy', { locale: ptBR }) : '—'}</p>
                        <p className="text-surface-subtle text-xs">{a.horaInicio} {a.horaFim ? `– ${a.horaFim}` : ''}</p>
                      </div>
                      <span className={`rm-badge status-${(a.status || '').toLowerCase()} flex-shrink-0`}>{a.status}</span>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => openEdit(a)} className="p-1.5 text-surface-subtle hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"><RiEditLine size={14} /></button>
                        <button onClick={() => setConfirmDelete(a)} className="p-1.5 text-surface-subtle hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><RiDeleteBinLine size={14} /></button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}

      <Modal isOpen={modalOpen} onClose={closeModal} title={editing ? 'Editar Agendamento' : 'Novo Agendamento'} size="lg">
        <AgendamentoForm onSubmit={handleSubmit} onCancel={closeModal} initialData={editing} loading={saving} />
      </Modal>

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar Exclusão" size="sm">
        <p className="text-surface-subtle mb-6">Deseja excluir o agendamento de <span className="text-slate-200 font-semibold">{confirmDelete?.cliente?.nome || confirmDelete?.cliente}</span>?</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors">Excluir</button>
          <button onClick={() => setConfirmDelete(null)} className="flex-1 rm-btn-secondary justify-center">Cancelar</button>
        </div>
      </Modal>
    </div>
  )
}

function MonthGrid({ current, events, onEdit }) {
  const start = startOfMonth(current)
  const end = endOfMonth(current)
  const days = eachDayOfInterval({ start, end })
  const startOffset = (getDay(start) + 6) % 7 // mon=0

  return (
    <div className="grid grid-cols-7">
      {Array.from({ length: startOffset }).map((_, i) => (
        <div key={`e-${i}`} className="min-h-[100px] border-r border-b border-surface-border last:border-r-0 bg-surface/30" />
      ))}
      {days.map(day => {
        const isToday = isSameDay(day, new Date())
        const dayEvents = events.filter(a => { try { return isSameDay(parseISO(a.data), day) } catch { return false } })
        const col = (getDay(day) + 6) % 7
        return (
          <div key={day} className={`min-h-[100px] border-r border-b border-surface-border p-2 ${col === 6 ? 'border-r-0' : ''} ${isToday ? 'bg-brand-500/5' : ''}`}>
            <p className={`text-sm font-semibold mb-1 ${isToday ? 'text-brand-400' : 'text-surface-subtle'}`}>{format(day, 'd')}</p>
            <div className="space-y-0.5">
              {dayEvents.slice(0, 3).map(a => {
                const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG.Pendente
                return (
                  <div key={a.id} onClick={() => onEdit(a)} className={`cal-event ${cfg.cls} text-xs`}>
                    {a.horaInicio} {a.cliente?.nome || a.cliente}
                  </div>
                )
              })}
              {dayEvents.length > 3 && <p className="text-xs text-surface-subtle pl-1">+{dayEvents.length - 3}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

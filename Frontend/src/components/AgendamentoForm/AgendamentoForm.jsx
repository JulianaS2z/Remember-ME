import { useState, useEffect } from 'react'
import clienteService from '../../services/clienteService.js'
import profissionalService from '../../services/profissionalService.js'
import servicoService from '../../services/servicoService.js'
import salaService from '../../services/salaService.js'

const STATUS_OPTIONS = ['Pendente', 'Confirmado', 'Cancelado', 'Finalizado']

const EMPTY = {
  clienteId: '', profissionalId: '', salaId: '', servicoId: '',
  data: '', horaInicio: '', horaFim: '', status: 'Pendente', observacoes: ''
}

export default function AgendamentoForm({ onSubmit, onCancel, initialData = null, loading = false }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [options, setOptions] = useState({ clientes: [], profissionais: [], salas: [], servicos: [] })

  useEffect(() => {
    Promise.all([
      clienteService.listar().catch(() => []),
      profissionalService.listar().catch(() => []),
      salaService.listar().catch(() => []),
      servicoService.listar().catch(() => []),
    ]).then(([c, p, s, sv]) => {
      setOptions({
        clientes: Array.isArray(c) ? c : c?.data || [],
        profissionais: Array.isArray(p) ? p : p?.data || [],
        salas: Array.isArray(s) ? s : s?.data || [],
        servicos: Array.isArray(sv) ? sv : sv?.data || [],
      })
    })
  }, [])

  useEffect(() => {
    if (initialData) {
      setForm({
        clienteId: initialData.clienteId || initialData.cliente?.id || '',
        profissionalId: initialData.profissionalId || initialData.profissional?.id || '',
        salaId: initialData.salaId || initialData.sala?.id || '',
        servicoId: initialData.servicoId || initialData.servico?.id || '',
        data: initialData.data?.slice(0, 10) || '',
        horaInicio: initialData.horaInicio || '',
        horaFim: initialData.horaFim || '',
        status: initialData.status || 'Pendente',
        observacoes: initialData.observacoes || '',
      })
    } else setForm(EMPTY)
  }, [initialData])

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.clienteId || !form.data || !form.horaInicio) return setError('Cliente, data e hora de início são obrigatórios.')
    try { await onSubmit(form) } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar agendamento.')
    }
  }

  const selClass = "rm-input appearance-none"

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Cliente *</label>
          <select name="clienteId" value={form.clienteId} onChange={handle} required className={selClass}>
            <option value="">Selecione</option>
            {options.clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Profissional</label>
          <select name="profissionalId" value={form.profissionalId} onChange={handle} className={selClass}>
            <option value="">Selecione</option>
            {options.profissionais.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Serviço</label>
          <select name="servicoId" value={form.servicoId} onChange={handle} className={selClass}>
            <option value="">Selecione</option>
            {options.servicos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Sala</label>
          <select name="salaId" value={form.salaId} onChange={handle} className={selClass}>
            <option value="">Selecione</option>
            {options.salas.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Data *</label>
          <input type="date" name="data" value={form.data} onChange={handle} required className="rm-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Início *</label>
          <input type="time" name="horaInicio" value={form.horaInicio} onChange={handle} required className="rm-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Fim</label>
          <input type="time" name="horaFim" value={form.horaFim} onChange={handle} className="rm-input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
        <select name="status" value={form.status} onChange={handle} className={selClass}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Observações</label>
        <textarea name="observacoes" value={form.observacoes} onChange={handle} rows={3} placeholder="Observações adicionais..." className="rm-input resize-none" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="rm-btn-primary">{loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Agendar'}</button>
        <button type="button" onClick={onCancel} className="rm-btn-secondary">Cancelar</button>
      </div>
    </form>
  )
}

import { useState, useEffect } from 'react'
import clienteService from '../../services/clienteService.js'
import profissionalService from '../../services/profissionalService.js'
import servicoService from '../../services/servicoService.js'
import salaService from '../../services/salaService.js'

const STATUS_OPTIONS = ['Pendente', 'Confirmado', 'Cancelado', 'Finalizado']

const EMPTY = {
  clienteId: '',
  profissionalId: '',
  salaId: '',
  servicoId: '',
  data: '',
  horaInicio: '',
  status: 'Pendente',
  observacoes: '',
}

function apiError(err) {
  return err.response?.data?.erro || err.response?.data?.message || 'Erro ao salvar agendamento.'
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
    ]).then(([clientes, profissionais, salas, servicos]) => {
      setOptions({
        clientes: Array.isArray(clientes) ? clientes : clientes?.data || [],
        profissionais: (Array.isArray(profissionais) ? profissionais : profissionais?.data || []).filter((p) => p.ativo !== false),
        salas: Array.isArray(salas) ? salas : salas?.data || [],
        servicos: Array.isArray(servicos) ? servicos : servicos?.data || [],
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
    } else {
      setForm(EMPTY)
    }
  }, [initialData])

  const handle = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.clienteId) return setError('Cliente é obrigatório.')
    if (!form.profissionalId) return setError('Profissional é obrigatório.')
    if (!form.servicoId) return setError('Serviço é obrigatório.')
    if (!form.salaId) return setError('Sala é obrigatória.')
    if (!form.data) return setError('Data é obrigatória.')
    if (!form.horaInicio) return setError('Hora de início é obrigatória.')

    try {
      const { horaFim, ...payload } = form

      await onSubmit(payload)
    } catch (err) {
      setError(apiError(err))
    }
  }

  const selClass = 'rm-input appearance-none'

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Cliente *</label>
          <select name="clienteId" value={form.clienteId} onChange={handle} required className={selClass}>
            <option value="">Selecione</option>
            {options.clientes.map((cliente) => <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Profissional *</label>
          <select name="profissionalId" value={form.profissionalId} onChange={handle} required className={selClass}>
            <option value="">Selecione</option>
            {options.profissionais.map((profissional) => <option key={profissional.id} value={profissional.id}>{profissional.nome}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Serviço *</label>
          <select name="servicoId" value={form.servicoId} onChange={handle} required className={selClass}>
            <option value="">Selecione</option>
            {options.servicos.map((servico) => <option key={servico.id} value={servico.id}>{servico.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Sala *</label>
          <select name="salaId" value={form.salaId} onChange={handle} required className={selClass}>
            <option value="">Selecione</option>
            {options.salas.map((sala) => <option key={sala.id} value={sala.id}>{sala.nome}</option>)}
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
          <input type="time" name="horaFim" value={form.horaFim} disabled className="rm-input opacity-60" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
        <select name="status" value={form.status} onChange={handle} className={selClass}>
          {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
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

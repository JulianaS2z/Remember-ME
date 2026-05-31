import { useState, useEffect } from 'react'

const STATUS_OPTIONS = ['Ativo', 'Inativo']
const EMPTY = { nome: '', email: '', telefone: '', dataNascimento: '', status: 'Ativo' }

function apiError(err) {
  return err.response?.data?.erro || err.response?.data?.message || 'Erro ao salvar cliente.'
}

export default function ClienteForm({ onSubmit, onCancel, initialData = null, loading = false }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || '',
        email: initialData.email || '',
        telefone: initialData.telefone || '',
        dataNascimento: initialData.dataNascimento?.slice(0, 10) || '',
        status: initialData.status || 'Ativo',
      })
    } else {
      setForm(EMPTY)
    }
  }, [initialData])

  const handle = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.nome.trim()) return setError('Nome é obrigatório.')
    if (!form.email.trim()) return setError('E-mail é obrigatório.')
    if (!form.telefone.trim()) return setError('Telefone é obrigatório.')
    if (!form.dataNascimento) return setError('Data de nascimento é obrigatória.')

    try {
      await onSubmit(form)
    } catch (err) {
      setError(apiError(err))
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome *</label>
        <input name="nome" value={form.nome} onChange={handle} required placeholder="Nome completo" className="rm-input" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">E-mail *</label>
          <input type="email" name="email" value={form.email} onChange={handle} required placeholder="email@exemplo.com" className="rm-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Telefone *</label>
          <input name="telefone" value={form.telefone} onChange={handle} required placeholder="(11) 99999-9999" className="rm-input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Data de Nascimento *</label>
          <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handle} required className="rm-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
          <select name="status" value={form.status} onChange={handle} className="rm-input">
            {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="rm-btn-primary">
          {loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}
        </button>
        <button type="button" onClick={onCancel} className="rm-btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}

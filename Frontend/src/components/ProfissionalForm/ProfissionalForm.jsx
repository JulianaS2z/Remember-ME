import { useState, useEffect } from 'react'

const EMPTY = { nome: '', email: '', telefone: '', ativo: true }

function apiError(err) {
  return err.response?.data?.erro || err.response?.data?.message || 'Erro ao salvar profissional.'
}

export default function ProfissionalForm({ onSubmit, onCancel, initialData = null, loading = false }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || '',
        email: initialData.email || '',
        telefone: initialData.telefone || '',
        ativo: initialData.ativo ?? true,
      })
    } else {
      setForm(EMPTY)
    }
  }, [initialData])

  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.nome.trim()) return setError('Nome é obrigatório.')
    if (!form.email.trim()) return setError('E-mail é obrigatório.')
    if (!form.telefone.trim()) return setError('Telefone é obrigatório.')

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
        <input name="nome" value={form.nome} onChange={handle} required placeholder="Nome do profissional" className="rm-input" />
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

      <div className="flex items-center gap-3">
        <input type="checkbox" id="ativo" name="ativo" checked={form.ativo} onChange={handle} className="w-4 h-4 accent-brand-500" />
        <label htmlFor="ativo" className="text-sm font-medium text-slate-300 cursor-pointer">Profissional ativo</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="rm-btn-primary">{loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}</button>
        <button type="button" onClick={onCancel} className="rm-btn-secondary">Cancelar</button>
      </div>
    </form>
  )
}

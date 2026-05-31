import { useState, useEffect } from 'react'

const EMPTY = { nome: '', ativo: true }

export default function ProfissionalForm({ onSubmit, onCancel, initialData = null, loading = false }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) setForm({ nome: initialData.nome || '', ativo: initialData.ativo ?? true })
    else setForm(EMPTY)
  }, [initialData])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.nome.trim()) return setError('Nome é obrigatório.')
    try { await onSubmit(form) } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar profissional.')
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome *</label>
        <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} required placeholder="Nome do profissional" className="rm-input" />
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="ativo" checked={form.ativo} onChange={e => setForm(f => ({ ...f, ativo: e.target.checked }))} className="w-4 h-4 accent-brand-500" />
        <label htmlFor="ativo" className="text-sm font-medium text-slate-300 cursor-pointer">Profissional ativo</label>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="rm-btn-primary">{loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}</button>
        <button type="button" onClick={onCancel} className="rm-btn-secondary">Cancelar</button>
      </div>
    </form>
  )
}

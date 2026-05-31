import { useState, useEffect } from 'react'

const EMPTY = { nome: '' }

export default function SalaForm({ onSubmit, onCancel, initialData = null, loading = false }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) setForm({ nome: initialData.nome || '' })
    else setForm(EMPTY)
  }, [initialData])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.nome.trim()) return setError('Nome é obrigatório.')
    try { await onSubmit(form) } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar sala.')
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome da Sala *</label>
        <input value={form.nome} onChange={e => setForm({ nome: e.target.value })} required placeholder="Ex: Estúdio Principal" className="rm-input" />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="rm-btn-primary">{loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}</button>
        <button type="button" onClick={onCancel} className="rm-btn-secondary">Cancelar</button>
      </div>
    </form>
  )
}

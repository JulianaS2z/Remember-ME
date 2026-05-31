import { useState, useEffect } from 'react'

const EMPTY = { nome: '', duracao: '', preco: '' }

function apiError(err) {
  return err.response?.data?.erro || err.response?.data?.message || 'Erro ao salvar serviço.'
}

export default function ServicoForm({ onSubmit, onCancel, initialData = null, loading = false }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || '',
        duracao: initialData.duracao || initialData.duracaoMin || '',
        preco: initialData.preco || '',
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
    if (!form.duracao) return setError('Duração é obrigatória.')
    if (!form.preco) return setError('Preço é obrigatório.')

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
        <input name="nome" value={form.nome} onChange={handle} required placeholder="Ex: Ensaio Casal" className="rm-input" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Duração (min) *</label>
          <input type="number" name="duracao" value={form.duracao} onChange={handle} required min="1" placeholder="120" className="rm-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Preço (R$) *</label>
          <input type="number" step="0.01" name="preco" value={form.preco} onChange={handle} required min="0.01" placeholder="800.00" className="rm-input" />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="rm-btn-primary">{loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}</button>
        <button type="button" onClick={onCancel} className="rm-btn-secondary">Cancelar</button>
      </div>
    </form>
  )
}

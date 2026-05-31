import { useEffect, useState, useCallback } from 'react'
import { RiAddLine, RiSearchLine, RiEditLine, RiDeleteBinLine } from 'react-icons/ri'
import profissionalService from '../../services/profissionalService.js'
import Modal from '../../components/Modal/Modal.jsx'
import ProfissionalForm from '../../components/ProfissionalForm/ProfissionalForm.jsx'
import Loading from '../../components/Loading/Loading.jsx'

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const data = await profissionalService.listar()
      setProfissionais(Array.isArray(data) ? data : data?.data || [])
    } catch { setProfissionais([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (p) => { setEditing(p); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = async (form) => {
    setSaving(true)
    try {
      if (editing) await profissionalService.atualizar(editing.id, form)
      else await profissionalService.criar(form)
      closeModal(); fetch()
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try { await profissionalService.excluir(confirmDelete.id); setConfirmDelete(null); fetch() } catch {}
  }

  const toggleStatus = async (p) => {
    try { await profissionalService.alterarStatus(p.id, !p.ativo); fetch() } catch {}
  }

  const filtered = profissionais.filter(p => p.nome?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-surface-subtle text-sm">{profissionais.length} profissionais cadastrados</p>
        </div>
        <button onClick={openCreate} className="rm-btn-primary self-start sm:self-auto">
          <RiAddLine size={18} /> Novo Profissional
        </button>
      </div>

      <div className="rm-card">
        <div className="p-5 border-b border-surface-border">
          <div className="relative max-w-sm">
            <RiSearchLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar profissionais..." className="rm-input pl-10 py-2.5 text-sm" />
          </div>
        </div>

        {loading ? <Loading /> : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-border">
                  {['Profissional', 'Status', 'Ações'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-surface-subtle uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filtered.length === 0 && <tr><td colSpan={3} className="text-center py-12 text-surface-subtle">Nenhum profissional encontrado.</td></tr>}
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                          {p.nome?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-200">{p.nome}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => toggleStatus(p)} className={`rm-badge cursor-pointer hover:opacity-80 transition-opacity ${p.ativo ? 'status-ativo' : 'status-inativo'}`}>
                        {p.ativo ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 text-surface-subtle hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"><RiEditLine size={16} /></button>
                        <button onClick={() => setConfirmDelete(p)} className="p-2 text-surface-subtle hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><RiDeleteBinLine size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title={editing ? 'Editar Profissional' : 'Novo Profissional'} size="sm">
        <ProfissionalForm onSubmit={handleSubmit} onCancel={closeModal} initialData={editing} loading={saving} />
      </Modal>

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar Exclusão" size="sm">
        <p className="text-surface-subtle mb-6">Deseja excluir <span className="text-slate-200 font-semibold">{confirmDelete?.nome}</span>?</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors">Excluir</button>
          <button onClick={() => setConfirmDelete(null)} className="flex-1 rm-btn-secondary justify-center">Cancelar</button>
        </div>
      </Modal>
    </div>
  )
}

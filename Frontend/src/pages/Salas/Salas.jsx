import { useEffect, useState, useCallback } from 'react'
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiDoorOpenLine } from 'react-icons/ri'
import salaService from '../../services/salaService.js'
import Modal from '../../components/Modal/Modal.jsx'
import SalaForm from '../../components/SalaForm/SalaForm.jsx'
import Loading from '../../components/Loading/Loading.jsx'

export default function Salas() {
  const [salas, setSalas] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const data = await salaService.listar()
      setSalas(Array.isArray(data) ? data : data?.data || [])
    } catch { setSalas([]) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (s) => { setEditing(s); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = async (form) => {
    setSaving(true)
    try {
      if (editing) await salaService.atualizar(editing.id, form)
      else await salaService.criar(form)
      closeModal(); fetch()
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try { await salaService.excluir(confirmDelete.id); setConfirmDelete(null); fetch() } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="flex-1 text-surface-subtle text-sm">{salas.length} salas cadastradas</p>
        <button onClick={openCreate} className="rm-btn-primary self-start sm:self-auto">
          <RiAddLine size={18} /> Nova Sala
        </button>
      </div>

      {loading ? <Loading /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {salas.length === 0 && <p className="col-span-3 text-center py-12 text-surface-subtle">Nenhuma sala cadastrada.</p>}
          {salas.map(s => (
            <div key={s.id} className="rm-card p-6 hover:border-surface-muted transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <RiDoorOpenLine size={22} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(s)} className="p-1.5 text-surface-subtle hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"><RiEditLine size={14} /></button>
                  <button onClick={() => setConfirmDelete(s)} className="p-1.5 text-surface-subtle hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><RiDeleteBinLine size={14} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-slate-200 text-lg">{s.nome}</h3>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={closeModal} title={editing ? 'Editar Sala' : 'Nova Sala'} size="sm">
        <SalaForm onSubmit={handleSubmit} onCancel={closeModal} initialData={editing} loading={saving} />
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

import { useEffect, useState, useCallback } from 'react'
import { RiAddLine, RiSearchLine, RiEditLine, RiDeleteBinLine, RiTimeLine, RiMoneyDollarCircleLine } from 'react-icons/ri'
import servicoService from '../../services/servicoService.js'
import Modal from '../../components/Modal/Modal.jsx'
import ServicoForm from '../../components/ServicoForm/ServicoForm.jsx'
import Loading from '../../components/Loading/Loading.jsx'

export default function Servicos() {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const data = await servicoService.listar()
      setServicos(Array.isArray(data) ? data : data?.data || [])
    } catch { setServicos([]) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (s) => { setEditing(s); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = async (form) => {
    setSaving(true)
    try {
      if (editing) await servicoService.atualizar(editing.id, form)
      else await servicoService.criar(form)
      closeModal(); fetch()
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try { await servicoService.excluir(confirmDelete.id); setConfirmDelete(null); fetch() } catch {}
  }

  const filtered = servicos.filter(s => s.nome?.toLowerCase().includes(search.toLowerCase()))

  const formatPrice = (p) => p ? `R$ ${Number(p).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '—'
  const formatDuration = (d) => d ? `${d} min` : '—'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="flex-1 text-surface-subtle text-sm">{servicos.length} serviços cadastrados</p>
        <button onClick={openCreate} className="rm-btn-primary self-start sm:self-auto">
          <RiAddLine size={18} /> Novo Serviço
        </button>
      </div>

      <div className="rm-card">
        <div className="p-5 border-b border-surface-border">
          <div className="relative max-w-sm">
            <RiSearchLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar serviços..." className="rm-input pl-10 py-2.5 text-sm" />
          </div>
        </div>

        {loading ? <Loading /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {filtered.length === 0 && <p className="col-span-3 text-center py-8 text-surface-subtle">Nenhum serviço encontrado.</p>}
            {filtered.map(s => (
              <div key={s.id} className="bg-surface border border-surface-border rounded-xl p-5 hover:border-surface-muted transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-slate-200">{s.nome}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(s)} className="p-1.5 text-surface-subtle hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"><RiEditLine size={14} /></button>
                    <button onClick={() => setConfirmDelete(s)} className="p-1.5 text-surface-subtle hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><RiDeleteBinLine size={14} /></button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-surface-subtle">
                    <RiTimeLine size={14} className="text-brand-400" />
                    <span>{formatDuration(s.duracao)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <RiMoneyDollarCircleLine size={14} className="text-emerald-400" />
                    <span className="font-semibold text-emerald-400">{formatPrice(s.preco)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title={editing ? 'Editar Serviço' : 'Novo Serviço'} size="sm">
        <ServicoForm onSubmit={handleSubmit} onCancel={closeModal} initialData={editing} loading={saving} />
      </Modal>

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar Exclusão" size="sm">
        <p className="text-surface-subtle mb-6">Deseja excluir o serviço <span className="text-slate-200 font-semibold">{confirmDelete?.nome}</span>?</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors">Excluir</button>
          <button onClick={() => setConfirmDelete(null)} className="flex-1 rm-btn-secondary justify-center">Cancelar</button>
        </div>
      </Modal>
    </div>
  )
}

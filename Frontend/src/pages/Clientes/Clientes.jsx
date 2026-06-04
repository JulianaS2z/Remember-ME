import { useEffect, useState, useCallback } from 'react'
import { RiAddLine, RiSearchLine, RiEditLine, RiDeleteBinLine, RiMoreLine } from 'react-icons/ri'
import clienteService from '../../services/clienteService.js'
import Modal from '../../components/Modal/Modal.jsx'
import ClienteForm from '../../components/ClienteForm/ClienteForm.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  const fetchClientes = useCallback(async () => {
    setLoading(true)
    try {
      const data = await clienteService.listar({ busca: search })
      setClientes(Array.isArray(data) ? data : data?.data || [])
    } catch {
      setClientes([])
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => { fetchClientes() }, [fetchClientes])

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (c) => { setEditing(c); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = async (form) => {
    setSaving(true)
    try {
      if (editing) {
        await clienteService.atualizar(editing.id, form)
      } else {
        await clienteService.criar(form)
      }
      closeModal()
      fetchClientes()
    } finally {
      setSaving(false)
    }
  }

  const askDelete = (cliente) => {
    setDeleteError('')
    setConfirmDelete(cliente)
  }

  const closeDeleteModal = () => {
    setDeleteError('')
    setConfirmDelete(null)
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    setDeleteError('')
    try {
      await clienteService.excluir(confirmDelete.id)
      closeDeleteModal()
      fetchClientes()
    } catch (err) {
      setDeleteError(err.response?.data?.erro || err.response?.data?.message || 'Não foi possível excluir o cliente.')
    }
  }

  const handleStatus = async (c) => {
    try {
      await clienteService.alterarStatus(c.id, c.status === 'Ativo' ? 'Inativo' : 'Ativo')
      fetchClientes()
    } catch {}
  }

  const filtered = clientes.filter(c =>
    c.nome?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-surface-subtle text-sm">Total: {clientes.length} clientes cadastrados</p>
        </div>
        <button onClick={openCreate} className="rm-btn-primary self-start sm:self-auto">
          <RiAddLine size={18} /> Novo Cliente
        </button>
      </div>

      <div className="rm-card">
        {/* Search */}
        <div className="p-5 border-b border-surface-border">
          <div className="relative max-w-sm">
            <RiSearchLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar clientes..."
              className="rm-input pl-10 py-2.5 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? <Loading /> : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-border">
                  {['Cliente', 'Contato', 'Nascimento', 'Status', 'Ações'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-surface-subtle uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-12 text-surface-subtle">Nenhum cliente encontrado.</td></tr>
                )}
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                          {c.nome?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-200">{c.nome}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-slate-300 text-sm">{c.email || '—'}</p>
                      <p className="text-surface-subtle text-xs">{c.telefone || '—'}</p>
                    </td>
                    <td className="px-5 py-4 text-surface-subtle text-sm">
                      {c.dataNascimento ? format(new Date(c.dataNascimento), 'dd/MM/yyyy', { locale: ptBR }) : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleStatus(c)}
                        className={`rm-badge cursor-pointer transition-opacity hover:opacity-80 status-${(c.status || '').toLowerCase()}`}
                      >
                        {c.status || 'Ativo'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(c)} className="p-2 text-surface-subtle hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors">
                          <RiEditLine size={16} />
                        </button>
                        <button onClick={() => askDelete(c)} className="p-2 text-surface-subtle hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <RiDeleteBinLine size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal} title={editing ? 'Editar Cliente' : 'Novo Cliente'}>
        <ClienteForm onSubmit={handleSubmit} onCancel={closeModal} initialData={editing} loading={saving} />
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!confirmDelete} onClose={closeDeleteModal} title="Confirmar Exclusão" size="sm">
        <p className="text-surface-subtle mb-6">
          Deseja excluir o cliente <span className="text-slate-200 font-semibold">{confirmDelete?.nome}</span>? Esta ação não pode ser desfeita.
        </p>
        {deleteError && <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{deleteError}</div>}
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors">
            Excluir
          </button>
          <button onClick={closeDeleteModal} className="flex-1 rm-btn-secondary justify-center">
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  )
}

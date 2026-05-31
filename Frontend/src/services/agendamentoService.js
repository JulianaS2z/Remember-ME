import api from './api.js'

const agendamentoService = {
  async listar(params = {}) {
    const { data } = await api.get('/agendamentos', { params })
    return data
  },
  async buscar(id) {
    const { data } = await api.get(`/agendamentos/${id}`)
    return data
  },
  async criar(payload) {
    const { data } = await api.post('/agendamentos', payload)
    return data
  },
  async atualizar(id, payload) {
    const { data } = await api.put(`/agendamentos/${id}`, payload)
    return data
  },
  async excluir(id) {
    const { data } = await api.delete(`/agendamentos/${id}`)
    return data
  },
  async alterarStatus(id, status) {
    const { data } = await api.patch(`/agendamentos/${id}/status`, { status })
    return data
  },
  async listarPorPeriodo(inicio, fim) {
    const { data } = await api.get('/agendamentos', { params: { inicio, fim } })
    return data
  },
}

export default agendamentoService

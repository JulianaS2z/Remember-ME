import api from './api.js'

const clienteService = {
  async listar(params = {}) {
    const { data } = await api.get('/clientes', { params })
    return data
  },
  async buscar(id) {
    const { data } = await api.get(`/clientes/${id}`)
    return data
  },
  async criar(payload) {
    const { data } = await api.post('/clientes', payload)
    return data
  },
  async atualizar(id, payload) {
    const { data } = await api.put(`/clientes/${id}`, payload)
    return data
  },
  async excluir(id) {
    const { data } = await api.delete(`/clientes/${id}`)
    return data
  },
  async alterarStatus(id, status) {
    const { data } = await api.patch(`/clientes/${id}/status`, { status })
    return data
  },
}

export default clienteService

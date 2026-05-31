import api from './api.js'

const profissionalService = {
  async listar(params = {}) {
    const { data } = await api.get('/profissionais', { params })
    return data
  },
  async buscar(id) {
    const { data } = await api.get(`/profissionais/${id}`)
    return data
  },
  async criar(payload) {
    const { data } = await api.post('/profissionais', payload)
    return data
  },
  async atualizar(id, payload) {
    const { data } = await api.put(`/profissionais/${id}`, payload)
    return data
  },
  async excluir(id) {
    const { data } = await api.delete(`/profissionais/${id}`)
    return data
  },
  async alterarStatus(id, ativo) {
    const { data } = await api.patch(`/profissionais/${id}/status`, { ativo })
    return data
  },
}

export default profissionalService

import api from './api.js'

const salaService = {
  async listar(params = {}) {
    const { data } = await api.get('/salas', { params })
    return data
  },
  async buscar(id) {
    const { data } = await api.get(`/salas/${id}`)
    return data
  },
  async criar(payload) {
    const { data } = await api.post('/salas', payload)
    return data
  },
  async atualizar(id, payload) {
    const { data } = await api.put(`/salas/${id}`, payload)
    return data
  },
  async excluir(id) {
    const { data } = await api.delete(`/salas/${id}`)
    return data
  },
}

export default salaService

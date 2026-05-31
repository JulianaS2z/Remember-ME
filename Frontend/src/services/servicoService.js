import api from './api.js'

const servicoService = {
  async listar(params = {}) {
    const { data } = await api.get('/servicos', { params })
    return data
  },
  async buscar(id) {
    const { data } = await api.get(`/servicos/${id}`)
    return data
  },
  async criar(payload) {
    const { data } = await api.post('/servicos', payload)
    return data
  },
  async atualizar(id, payload) {
    const { data } = await api.put(`/servicos/${id}`, payload)
    return data
  },
  async excluir(id) {
    const { data } = await api.delete(`/servicos/${id}`)
    return data
  },
}

export default servicoService

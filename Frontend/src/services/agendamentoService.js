import api from './api';

export const agendamentoService = {
  getAll: () => api.get('/agendamentos'),
  
  getById: (id) => api.get(`/agendamentos/${id}`),
  
  create: (dados) => api.post('/agendamentos', dados),
  
  update: (id, dados) => api.put(`/agendamentos/${id}`, dados),
  
  delete: (id) => api.delete(`/agendamentos/${id}`),
  
  getByCliente: (clienteId) => api.get(`/agendamentos/cliente/${clienteId}`),
  
  getByProfissional: (profissionalId) => api.get(`/agendamentos/profissional/${profissionalId}`),
};

export default agendamentoService;

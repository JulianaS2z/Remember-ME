import api from './api';

export const servicoService = {
  getAll: () => api.get('/servicos'),
  
  getById: (id) => api.get(`/servicos/${id}`),
  
  create: (dados) => api.post('/servicos', dados),
  
  update: (id, dados) => api.put(`/servicos/${id}`, dados),
  
  delete: (id) => api.delete(`/servicos/${id}`),
};

export default servicoService;

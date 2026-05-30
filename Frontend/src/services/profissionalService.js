import api from './api';

export const profissionalService = {
  getAll: () => api.get('/profissionais'),
  
  getById: (id) => api.get(`/profissionais/${id}`),
  
  create: (dados) => api.post('/profissionais', dados),
  
  update: (id, dados) => api.put(`/profissionais/${id}`, dados),
  
  delete: (id) => api.delete(`/profissionais/${id}`),
};

export default profissionalService;

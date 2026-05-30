import api from './api';

export const salaService = {
  getAll: () => api.get('/salas'),
  
  getById: (id) => api.get(`/salas/${id}`),
  
  create: (dados) => api.post('/salas', dados),
  
  update: (id, dados) => api.put(`/salas/${id}`, dados),
  
  delete: (id) => api.delete(`/salas/${id}`),
};

export default salaService;

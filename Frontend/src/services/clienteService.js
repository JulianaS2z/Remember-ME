import api from './api';

export const clienteService = {
  getAll: () => api.get('/clientes'),
  
  getById: (id) => api.get(`/clientes/${id}`),
  
  create: (dados) => api.post('/clientes', dados),
  
  update: (id, dados) => api.put(`/clientes/${id}`, dados),
  
  delete: (id) => api.delete(`/clientes/${id}`),
};

export default clienteService;

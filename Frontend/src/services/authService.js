import api from './api';

export const authService = {
  login: (email, senha) => api.post('/auth/login', { email, senha }),
  
  register: (dados) => api.post('/auth/register', dados),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  setToken: (token) => localStorage.setItem('token', token),
  
  getToken: () => localStorage.getItem('token'),
};

export default authService;

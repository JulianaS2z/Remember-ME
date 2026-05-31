import api from './api.js'

const authService = {
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, senha: password })
    if (data.token) {
      localStorage.setItem('rm_token', data.token)
      localStorage.setItem('rm_user', JSON.stringify(data.user || data.usuario))
    }
    return data
  },

  async logout() {
    try { await api.post('/auth/logout') } catch (_) {}
    localStorage.removeItem('rm_token')
    localStorage.removeItem('rm_user')
  },

  async getProfile() {
    const { data } = await api.get('/auth/profile')
    return data.user || data.usuario || data
  },

  async updateProfile(payload) {
    const { data } = await api.put('/auth/profile', payload)
    return data.user || data
  },

  async changePassword(payload) {
    const { data } = await api.put('/auth/change-password', payload)
    return data
  },

  getStoredUser() {
    try { return JSON.parse(localStorage.getItem('rm_user')) } catch { return null }
  },

  isAuthenticated() {
    return !!localStorage.getItem('rm_token')
  },
}

export default authService

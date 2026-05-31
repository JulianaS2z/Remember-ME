import { createContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    async function init() {
      if (!authService.isAuthenticated()) {
        setInitialized(true)
        return
      }

      try {
        const profile = await authService.getProfile()
        setUser(profile)
        localStorage.setItem('rm_user', JSON.stringify(profile))
      } catch (error) {
        await authService.logout()
        setUser(null)
      } finally {
        setInitialized(true)
      }
    }

    init()
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const data = await authService.login(email, password)
      const profile = data.user || data.usuario || null
      setUser(profile)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    const profile = await authService.getProfile()
    setUser(profile)
    localStorage.setItem('rm_user', JSON.stringify(profile))
    return profile
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, initialized, login, logout, refreshUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

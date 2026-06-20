/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('token')))

  async function refreshProfile() {
    const { data } = await api.get('/profile')
    setUser(data.user)
    setStats(data.stats)
    return data
  }

  async function authenticate(path, payload) {
    const { data } = await api.post(path, payload)
    localStorage.setItem('token', data.token)
    setUser(data.user)
    await refreshProfile()
  }

  async function logout() {
    await api.post('/logout')
    localStorage.removeItem('token')
    setUser(null)
    setStats(null)
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) return
    setTimeout(() => refreshProfile().finally(() => setLoading(false)), 0)
  }, [])

  return <AuthContext.Provider value={{ user, stats, loading, login: (payload) => authenticate('/login', payload), register: (payload) => authenticate('/register', payload), logout, refreshProfile }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

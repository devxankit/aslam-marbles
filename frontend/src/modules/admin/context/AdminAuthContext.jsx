import { createContext, useContext, useState, useEffect } from 'react'

const AdminAuthContext = createContext()

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const savedAdmin = localStorage.getItem('admin')

    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin))
      } catch (error) {
        localStorage.removeItem('admin')
      }
    }

    if (!token) {
      setLoading(false)
      return
    }

    const validateToken = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const res = await fetch(`${API_URL}/admin/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.ok) {
          const data = await res.json()
          const adminData = data.user || data.admin || data.data || data
          setAdmin(adminData)
          localStorage.setItem('admin', JSON.stringify(adminData))
        } else {
          localStorage.removeItem('adminToken')
          localStorage.removeItem('admin')
          setAdmin(null)
        }
      } catch (error) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('admin')
        setAdmin(null)
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [])

  const login = async (email, password) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials')
      }

      const adminData = data.admin || data.user || data
      if (data.token) {
        localStorage.setItem('adminToken', data.token)
      }
      if (adminData) {
        localStorage.setItem('admin', JSON.stringify(adminData))
        setAdmin(adminData)
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem('admin')
    localStorage.removeItem('adminToken')
  }

  const value = {
    admin,
    login,
    logout,
    loading,
    isAuthenticated: !!admin
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}


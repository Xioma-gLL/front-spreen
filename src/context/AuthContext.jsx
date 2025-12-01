import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// URL del API de Spring Boot
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)

  // Cargar usuario y token desde localStorage al iniciar
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setToken(storedToken)
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const login = async (credentials) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const userData = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          phonePrefix: data.phonePrefix,
        }
        setUser(userData)
        setToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', data.token)
        setIsLoading(false)
        return { success: true, user: userData }
      } else {
        setIsLoading(false)
        return { success: false, message: data.message || 'Error al iniciar sesión' }
      }
    } catch (error) {
      console.error('Error en login:', error)
      setIsLoading(false)
      return { success: false, message: 'Error de conexión con el servidor' }
    }
  }

  const register = async (userData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          phonePrefix: userData.phonePrefix,
          phone: userData.phone,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const user = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          phonePrefix: data.phonePrefix,
        }
        setUser(user)
        setToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', data.token)
        setIsLoading(false)
        return { success: true, user }
      } else {
        setIsLoading(false)
        return { success: false, message: data.message || 'Error al registrarse' }
      }
    } catch (error) {
      console.error('Error en register:', error)
      setIsLoading(false)
      return { success: false, message: 'Error de conexión con el servidor' }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // Para OAuth - establecer usuario desde callback
  const setOAuthUser = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    setIsAuthenticated(true)
  }

  const updateProfile = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  // Función helper para hacer peticiones autenticadas
  const authFetch = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return fetch(url, {
      ...options,
      headers,
    })
  }

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    authFetch,
    setOAuthUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
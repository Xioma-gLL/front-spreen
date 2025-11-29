import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Simular carga de usuario desde localStorage
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const login = async (userData) => {
    setIsLoading(true)
    // Return a promise so callers can await completion
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('AuthContext.login called with', userData)
        const user = {
          id: '1',
          email: userData.email,
          firstName: 'Juan',
          lastName: 'Pérez',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658ab4ff4e?w=150&h=150&fit=crop&crop=face'
        }
        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(user))
        setIsLoading(false)
        resolve(user)
      }, 1000)
    })
  }

  const register = async (userData) => {
    setIsLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('AuthContext.register called with', userData)
        const user = {
          id: Date.now().toString(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658ab4ff4e?w=150&h=150&fit=crop&crop=face'
        }
        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(user))
        setIsLoading(false)
        resolve(user)
      }, 1500)
    })
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const updateProfile = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
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
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setOAuthUser } = useAuth()
  const hasProcessed = useRef(false)

  useEffect(() => {
    // Evitar doble procesamiento
    if (hasProcessed.current) return
    hasProcessed.current = true

    const token = searchParams.get('token')
    const email = searchParams.get('email')
    const firstName = searchParams.get('firstName')
    const lastName = searchParams.get('lastName')

    if (token && email) {
      // Guardar datos del usuario
      const userData = {
        email: decodeURIComponent(email),
        firstName: decodeURIComponent(firstName || ''),
        lastName: decodeURIComponent(lastName || ''),
      }
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Notificar al contexto
      if (setOAuthUser) {
        setOAuthUser(userData, token)
      }
      
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { type: 'success', message: 'Inicio de sesión exitoso', duration: 3000 } 
      }))
      
      navigate('/', { replace: true })
    } else {
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { type: 'error', message: 'Error en la autenticación', duration: 4000 } 
      }))
      navigate('/login', { replace: true })
    }
  }, []) // Sin dependencias - solo ejecutar una vez

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] to-[#FFF5F5] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#591117] mx-auto mb-4"></div>
        <p className="text-gray-600">Procesando autenticación...</p>
      </div>
    </div>
  )
}

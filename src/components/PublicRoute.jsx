import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Componente para rutas públicas que no deben ser accesibles si el usuario ya está autenticado
 * Por ejemplo: login, registro, recuperar contraseña
 * Si el usuario ya está autenticado, lo redirige a la página principal o a donde venía
 */
export default function PublicRoute({ children, redirectTo = '/' }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-[#FFF5F5]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-maroon)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si ya está autenticado, redirigir
  if (isAuthenticated) {
    // Si hay una ubicación previa (por ejemplo, venía de una ruta protegida), ir ahí
    const from = location.state?.from?.pathname || redirectTo
    return <Navigate to={from} replace />
  }

  // Si no está autenticado, mostrar el contenido
  return children
}

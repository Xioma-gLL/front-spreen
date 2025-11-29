import { useState } from 'react'
import { useI18n } from '../context/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
// Inline SVG icons to replace react-icons dependency
const IconGoogle = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M12 11.5v2.9h3.7c-.16 1.06-.98 2.99-3.7 4.08C8.88 20.2 5 16.44 5 12c0-4.44 3.88-8.2 8.05-6.47 1.81.78 2.98 2.5 3.3 3.87H12z"/>
    <path fill="#4285F4" d="M21 12.24c0-.7-.06-1.16-.2-1.67H12v3.17h4.9c-.2 1.06-1.28 3.12-4.1 4.03-1.91.67-4.93-.31-6.44-1.65l-1.44 1.1C6.67 20.06 9.82 22 12.99 22c4.35 0 7.96-2.77 8.97-6.8 0-.03.01-.06.01-.96z"/>
    <path fill="#FBBC05" d="M7.54 14.39c-.41-1.24-.41-2.59 0-3.83l-1.44-1.1C4.02 9.29 3 11.3 3 12c0 .7.6 2.15 2.1 3.54l2.44-1.15z"/>
    <path fill="#34A853" d="M12 5.5c1.59 0 2.83.55 3.68 1.02l2.26-2.26C16.95 2.44 14.3 1 12 1 9.9 1 7.98 1.97 6.56 3.2l2.44 1.15C8.99 4.27 10.39 5.5 12 5.5z"/>
  </svg>
)
const IconFacebook = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H8.9v-2.89h1.53V9.41c0-1.51.9-2.34 2.27-2.34.66 0 1.35.12 1.35.12v1.49h-.77c-.76 0-1 .48-1 0v1.25h1.72l-.28 2.89h-1.44v6.99C18.34 21.12 22 16.99 22 12z"/>
  </svg>
)
const IconTwitter = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.58 8.58 0 01-2.72 1.04 4.26 4.26 0 00-7.26 3.88 12.1 12.1 0 01-8.8-4.46 4.26 4.26 0 001.32 5.69c-.66 0-1.28-.2-1.82-.5 0 2.02 1.4 3.72 3.3 4.11a4.27 4.27 0 01-1.92.07 4.26 4.26 0 003.98 2.96A8.55 8.55 0 012 19.54a12.06 12.06 0 006.54 1.92c7.85 0 12.14-6.5 12.14-12.13 0-.18-.02-.35-.03-.53A8.64 8.64 0 0024 6.59a8.43 8.43 0 01-2.54.7z"/>
  </svg>
)
const IconEye = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const IconEyeSlash = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.94 17.94A10.95 10.95 0 0112 20c-7 0-11-8-11-8a21.69 21.69 0 014.25-5.77" />
    <path d="M1 1l22 22" />
    <path d="M9.53 9.53a3.5 3.5 0 004.94 4.94" />
  </svg>
)
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { t } = useI18n()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('LoginPage.handleSubmit called with', formData)
    setIsLoading(true)
    
    try {
      await login(formData)
      // show success toast
      window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Inicio de sesión exitoso', duration: 3000 } }))
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Error al iniciar sesión', duration: 4000 } }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] to-[#FFF5F5] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <img
            src="https://plazatrujillo.com/wp-content/uploads/2025/09/cropped-logo-plaza-trujillo-192x192.webp"
            alt="Hotel Plaza Trujillo"
            className="mx-auto h-16 w-16 rounded-full object-cover mb-4 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-[#591117] mb-2">
            Bienvenido de vuelta
          </h2>
          <p className="text-gray-600">
            Inicia sesión en tu cuenta para continuar
          </p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#591117]/10 p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                placeholder="tu@email.com"
              />
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <IconEyeSlash size={18} className="w-4 h-4" /> : <IconEye size={18} className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Opciones adicionales */}
              <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#F21905] focus:ring-[#F26A4B] border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Recuérdame
                </label>
              </div>
              <Link
                to="/recuperar-contrasena"
                className="text-sm text-[#591117] hover:text-[#F26A4B] transition-colors cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de login */}
              <button
              type="submit"
              disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#591117] to-[#F26A4B] text-white py-3 px-4 rounded-lg font-medium hover:from-[#F21905] hover:to-[#8C0808] focus:outline-none focus:ring-2 focus:ring-[#F26A4B] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O continúa con</span>
            </div>
          </div>

          {/* Botones de login social */}
          <div className="grid grid-cols-3 gap-3">
              <button
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200"
            >
              <IconGoogle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200"
            >
              <IconFacebook className="text-blue-600 w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialLogin('twitter')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200"
            >
              <IconTwitter className="text-blue-400 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Enlace a registro */}
        <div className="text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/registro"
              className="font-medium text-[#591117] hover:text-[#F26A4B] transition-colors cursor-pointer"
            >
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
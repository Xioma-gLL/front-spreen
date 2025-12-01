import { useState } from 'react'
import { useI18n } from '../context/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
// Inline SVG icon components instead of react-icons to avoid dependency issues
const GoogleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
    <path fill="#fbc02d" d="M43.6 20.5H42V20H24v8h11.3C33.5 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.2l5.7-5.7C34.9 6.1 29.8 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.9 0 19.2-7.9 19.2-19 0-1.3-.1-2.6-.6-3.5z"/>
    <path fill="#e53935" d="M6.3 14.7l6.6 4.8C14.1 16 18.8 12 24 12c3.1 0 5.9 1.2 8 3.2l5.7-5.7C34.9 6.1 29.8 4 24 4 16 4 8.9 8.2 6.3 14.7z"/>
    <path fill="#4caf50" d="M24 44c6.2 0 11.7-2.4 15.9-6.4l-7.4-6.2C29.9 33.6 27.1 34.8 24 34.8c-5.2 0-9.5-3.1-11.3-7.4l-6.8 5.2C8.1 39 15.3 44 24 44z"/>
    <path fill="#1565c0" d="M43.6 20.5H42V20H24v8h11.3c-1 2.6-3.6 5.4-7.3 7.2 0 0 0 0 0 0l7.4 6.2C40.8 39.8 48 33.3 48 24 48 22 47.8 21 47.6 20h-4z"/>
  </svg>
)

const FacebookIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="#1877f2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.094 4.388 23 10.125 24v-8.485H7.078v-3.442h3.047V9.41c0-3.007 1.792-4.666 4.533-4.666 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.494 0-1.953.925-1.953 1.874v2.25h3.328l-.532 3.442h-2.796L14.875 24C20.612 23 24 18.094 24 12.073z"/>
  </svg>
)

const EyeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
  </svg>
)

const EyeOffIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18M10.47 10.47A3 3 0 0113.53 13.53" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.88 5.66A9.96 9.96 0 0121 12c-1.274 4.057-5.065 7-9.542 7a9.96 9.96 0 01-8.58-4.64" />
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOffIcon className="text-gray-400" /> : <EyeIcon className="text-gray-400" />}
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
                  className="h-4 w-4 text-[#F21905] focus:ring-[#F26A4B] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 cursor-pointer">
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
                className="w-full bg-gradient-to-r from-[#591117] to-[#F26A4B] text-white py-3 px-4 rounded-lg font-medium hover:from-[#F21905] hover:to-[#8C0808] focus:outline-none focus:ring-2 focus:ring-[#F26A4B] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
          <div className="grid grid-cols-2 gap-3">
              <button
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200 cursor-pointer"
            >
              <GoogleIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200 cursor-pointer"
            >
              <FacebookIcon className="text-blue-600 w-5 h-5" />
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
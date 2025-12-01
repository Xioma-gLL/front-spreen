import { useState } from 'react'
import { useI18n } from '../context/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
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
                  {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
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
              <FcGoogle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200 cursor-pointer"
            >
              <FaFacebook className="text-blue-600 w-5 h-5" />
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
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/LanguageContext'

const CloseIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const GoogleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
    <path fill="#fbc02d" d="M43.6 20.5H42V20H24v8h11.3C33.5 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.2l5.7-5.7C34.9 6.1 29.8 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.9 0 19.2-7.9 19.2-19 0-1.3-.1-2.6-.6-3.5z"/>
    <path fill="#e53935" d="M6.3 14.7l6.6 4.8C14.1 16 18.8 12 24 12c3.1 0 5.9 1.2 8 3.2l5.7-5.7C34.9 6.1 29.8 4 24 4 16 4 8.9 8.2 6.3 14.7z"/>
    <path fill="#4caf50" d="M24 44c6.2 0 11.7-2.4 15.9-6.4l-7.4-6.2C29.9 33.6 27.1 34.8 24 34.8c-5.2 0-9.5-3.1-11.3-7.4l-6.8 5.2C8.1 39 15.3 44 24 44z"/>
    <path fill="#1565c0" d="M43.6 20.5H42V20H24v8h11.3c-1 2.6-3.6 5.4-7.3 7.2 0 0 0 0 0 0l7.4 6.2C40.8 39.8 48 33.3 48 24 48 22 47.8 21 47.6 20h-4z"/>
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// ===== COMPONENTE PRINCIPAL DEL MODAL =====
export default function AuthModal({ isOpen, onClose, initialView = 'login' }) {
  const [currentView, setCurrentView] = useState(initialView)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  useEffect(() => {
    setCurrentView(initialView)
  }, [initialView])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  const handleSuccess = () => {
    onClose()
  }

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-100 flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Contenido según la vista */}
        {currentView === 'login' && (
          <LoginContent 
            onChangeView={handleViewChange} 
            onSuccess={handleSuccess}
          />
        )}
        {currentView === 'register' && (
          <RegisterContent 
            onChangeView={handleViewChange} 
            onSuccess={handleSuccess}
          />
        )}
        {currentView === 'forgot' && (
          <ForgotPasswordContent 
            onChangeView={handleViewChange}
          />
        )}
      </div>
    </div>
  )
}

// ===== CONTENIDO DE LOGIN (igual que LoginPage) =====
function LoginContent({ onChangeView, onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
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
    setIsLoading(true)
    
    try {
      const result = await login(formData)
      if (result.success) {
        window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Inicio de sesión exitoso', duration: 3000 } }))
        onSuccess()
      } else {
        window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: result.message || 'Error al iniciar sesión', duration: 4000 } }))
      }
    } catch (error) {
      console.error('Login error:', error)
      window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Error al iniciar sesión', duration: 4000 } }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorize/${provider}`
  }

  return (
    <div className="p-8 space-y-6">
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
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <div>
            <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              id="modal-email"
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
            <label htmlFor="modal-password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="modal-password"
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
                id="modal-rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#F21905] focus:ring-[#F26A4B] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="modal-rememberMe" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Recuérdame
              </label>
            </div>
            <button
              type="button"
              onClick={() => onChangeView('forgot')}
              className="text-sm text-[#591117] hover:text-[#F26A4B] transition-colors cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </button>
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

        {/* Botón de login con Google */}
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200 cursor-pointer"
        >
          <GoogleIcon className="w-5 h-5" />
          <span className="text-gray-600 font-medium">Google</span>
        </button>
      </div>

      {/* Enlace a registro */}
      <div className="text-center">
        <p className="text-gray-600">
          ¿No tienes una cuenta?{' '}
          <button
            type="button"
            onClick={() => onChangeView('register')}
            className="font-medium text-[#591117] hover:text-[#F26A4B] transition-colors cursor-pointer"
          >
            Regístrate gratis
          </button>
        </p>
      </div>
    </div>
  )
}

// ===== CONTENIDO DE REGISTRO (igual que RegisterPage) =====
function RegisterContent({ onChangeView, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phonePrefix: '+51',
    phone: '',
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPrefixDropdown, setShowPrefixDropdown] = useState(false)
  const { register } = useAuth()
  const { t } = useI18n()

  const countryCodes = [
    { code: '+51', country: 'pe', name: 'Perú', digits: 9, placeholder: '999 999 999' },
    { code: '+1', country: 'us', name: 'Estados Unidos', digits: 10, placeholder: '(555) 555-5555' },
    { code: '+52', country: 'mx', name: 'México', digits: 10, placeholder: '55 1234 5678' },
    { code: '+54', country: 'ar', name: 'Argentina', digits: 10, placeholder: '11 1234 5678' },
    { code: '+55', country: 'br', name: 'Brasil', digits: 11, placeholder: '11 91234 5678' },
    { code: '+56', country: 'cl', name: 'Chile', digits: 9, placeholder: '9 1234 5678' },
    { code: '+57', country: 'co', name: 'Colombia', digits: 10, placeholder: '300 123 4567' },
    { code: '+58', country: 've', name: 'Venezuela', digits: 10, placeholder: '412 123 4567' },
    { code: '+593', country: 'ec', name: 'Ecuador', digits: 9, placeholder: '99 123 4567' },
    { code: '+591', country: 'bo', name: 'Bolivia', digits: 8, placeholder: '7123 4567' },
    { code: '+595', country: 'py', name: 'Paraguay', digits: 9, placeholder: '981 123456' },
    { code: '+598', country: 'uy', name: 'Uruguay', digits: 8, placeholder: '94 123 456' },
    { code: '+34', country: 'es', name: 'España', digits: 9, placeholder: '612 345 678' },
    { code: '+33', country: 'fr', name: 'Francia', digits: 9, placeholder: '6 12 34 56 78' },
    { code: '+49', country: 'de', name: 'Alemania', digits: 11, placeholder: '151 1234 5678' },
    { code: '+39', country: 'it', name: 'Italia', digits: 10, placeholder: '312 345 6789' },
    { code: '+44', country: 'gb', name: 'Reino Unido', digits: 10, placeholder: '7911 123456' },
    { code: '+351', country: 'pt', name: 'Portugal', digits: 9, placeholder: '912 345 678' },
    { code: '+81', country: 'jp', name: 'Japón', digits: 10, placeholder: '90 1234 5678' },
    { code: '+86', country: 'cn', name: 'China', digits: 11, placeholder: '131 1234 5678' },
    { code: '+82', country: 'kr', name: 'Corea del Sur', digits: 10, placeholder: '10 1234 5678' },
    { code: '+61', country: 'au', name: 'Australia', digits: 9, placeholder: '412 345 678' },
    { code: '+64', country: 'nz', name: 'Nueva Zelanda', digits: 9, placeholder: '21 123 4567' },
  ]

  const selectedCountry = countryCodes.find(c => c.code === formData.phonePrefix) || countryCodes[0]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { type: 'error', message: 'Las contraseñas no coinciden', duration: 4000 } 
      }))
      return
    }

    if (!formData.acceptTerms) {
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { type: 'error', message: 'Debes aceptar los términos y condiciones', duration: 4000 } 
      }))
      return
    }

    setIsLoading(true)
    
    try {
      const result = await register({
        ...formData,
        phone: `${formData.phonePrefix}${formData.phone}`
      })
      
      if (result.success) {
        window.dispatchEvent(new CustomEvent('toast', { 
          detail: { type: 'success', message: '¡Registro exitoso! Bienvenido', duration: 3000 } 
        }))
        onSuccess()
      } else {
        window.dispatchEvent(new CustomEvent('toast', { 
          detail: { type: 'error', message: result.message || 'Error al registrarse', duration: 4000 } 
        }))
      }
    } catch (error) {
      console.error('Register error:', error)
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { type: 'error', message: 'Error al registrarse', duration: 4000 } 
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorize/${provider}`
  }

  return (
    <div className="p-8 space-y-6">
      {/* Logo y título */}
      <div className="text-center">
        <img
          src="https://plazatrujillo.com/wp-content/uploads/2025/09/cropped-logo-plaza-trujillo-192x192.webp"
          alt="Hotel Plaza Trujillo"
          className="mx-auto h-16 w-16 rounded-full object-cover mb-4 shadow-lg"
        />
        <h2 className="text-3xl font-bold text-[#591117] mb-2">
          Crea tu cuenta
        </h2>
        <p className="text-gray-600">
          Únete y disfruta de beneficios exclusivos
        </p>
      </div>

      {/* Formulario de registro */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                id="modal-firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="modal-lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                id="modal-lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="modal-reg-email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              id="modal-reg-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
              placeholder="tu@email.com"
            />
          </div>

          {/* Teléfono con selector de país */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono (opcional)
            </label>
            <div className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPrefixDropdown(!showPrefixDropdown)}
                  className="flex items-center gap-1 px-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className={`fi fi-${selectedCountry.country}`}></span>
                  <span className="text-sm">{formData.phonePrefix}</span>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {showPrefixDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto w-56">
                    {countryCodes.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, phonePrefix: country.code }))
                          setShowPrefixDropdown(false)
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm text-left"
                      >
                        <span className={`fi fi-${country.country}`}></span>
                        <span className="flex-1">{country.name}</span>
                        <span className="text-gray-400">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                placeholder={selectedCountry.placeholder}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="modal-reg-password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="modal-reg-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="modal-confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="modal-confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                placeholder="Repite tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Términos y condiciones */}
          <div className="flex items-start gap-2">
            <input
              id="modal-acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-[#F21905] focus:ring-[#F26A4B] border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="modal-acceptTerms" className="text-sm text-gray-600 cursor-pointer">
              Acepto los{' '}
              <span className="text-[#591117] hover:text-[#F26A4B] cursor-pointer">términos y condiciones</span>
              {' '}y la{' '}
              <span className="text-[#591117] hover:text-[#F26A4B] cursor-pointer">política de privacidad</span>
            </label>
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#591117] to-[#F26A4B] text-white py-3 px-4 rounded-lg font-medium hover:from-[#F21905] hover:to-[#8C0808] focus:outline-none focus:ring-2 focus:ring-[#F26A4B] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Registrando...
              </div>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        {/* Divisor */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O regístrate con</span>
          </div>
        </div>

        {/* Botón de registro con Google */}
        <button
          onClick={() => handleSocialRegister('google')}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200 cursor-pointer"
        >
          <GoogleIcon className="w-5 h-5" />
          <span className="text-gray-600 font-medium">Google</span>
        </button>
      </div>

      {/* Enlace a login */}
      <div className="text-center">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <button
            type="button"
            onClick={() => onChangeView('login')}
            className="font-medium text-[#591117] hover:text-[#F26A4B] transition-colors cursor-pointer"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  )
}

// ===== CONTENIDO DE RECUPERAR CONTRASEÑA (igual que ForgotPasswordPage) =====
function ForgotPasswordContent({ onChangeView }) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        window.dispatchEvent(new CustomEvent('toast', { 
          detail: { type: 'success', message: 'Revisa tu correo electrónico', duration: 4000 } 
        }))
      } else {
        window.dispatchEvent(new CustomEvent('toast', { 
          detail: { type: 'error', message: data.message || 'Error al enviar correo', duration: 4000 } 
        }))
      }
    } catch (error) {
      console.error('Error:', error)
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { type: 'error', message: 'Error de conexión con el servidor', duration: 4000 } 
      }))
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="p-8 space-y-6">
        {/* Icono de éxito */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#591117] to-[#F26A4B] rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#591117] mb-2">
            ¡Correo enviado!
          </h2>
          <p className="text-gray-600 mb-6">
            Hemos enviado un enlace de recuperación a tu correo electrónico.
            Por favor revisa tu bandeja de entrada y sigue las instrucciones.
          </p>
          <div className="bg-[#FFF7F7] border border-[#F26A4B]/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-[#591117]">
              <strong>Consejo:</strong> Si no encuentras el correo en tu bandeja de entrada,
              revisa la carpeta de spam o correo no deseado.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChangeView('login')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#591117] to-[#F26A4B] text-white font-medium rounded-lg hover:from-[#F21905] hover:to-[#8C0808] transition-all duration-200"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Logo y título */}
      <div className="text-center">
        <img
          src="https://plazatrujillo.com/wp-content/uploads/2025/09/cropped-logo-plaza-trujillo-192x192.webp"
          alt="Hotel Plaza Trujillo"
          className="mx-auto h-16 w-16 rounded-full object-cover mb-4 shadow-lg"
        />
        <h2 className="text-2xl font-bold text-[#591117] mb-2">
          ¿Olvidaste tu contraseña?
        </h2>
        <p className="text-gray-600">
          No te preocupes, te ayudaremos a recuperarla
        </p>
      </div>

      {/* Información adicional */}
      <div className="bg-[#FFF7F7] border border-[#F26A4B]/20 rounded-lg p-4">
        <p className="text-sm text-[#591117]">
          <strong>Instrucciones:</strong> Ingresa tu correo electrónico y te enviaremos
          un enlace seguro para restablecer tu contraseña.
        </p>
      </div>

      {/* Formulario de recuperación */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <div>
            <label htmlFor="modal-forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              id="modal-forgot-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
              placeholder="tu@email.com"
            />
            <p className="mt-1 text-sm text-gray-500">
              Te enviaremos un enlace de recuperación a este correo
            </p>
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#591117] to-[#F26A4B] text-white py-3 px-4 rounded-lg font-medium hover:from-[#F21905] hover:to-[#8C0808] focus:outline-none focus:ring-2 focus:ring-[#F26A4B] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Enviando...
              </div>
            ) : (
              'Enviar enlace de recuperación'
            )}
          </button>
        </form>

        {/* Consejos de seguridad */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Consejos de seguridad:
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-[#F26A4B] mr-2">•</span>
              Usa una contraseña única y segura
            </li>
            <li className="flex items-start">
              <span className="text-[#F26A4B] mr-2">•</span>
              No compartas tu contraseña con nadie
            </li>
            <li className="flex items-start">
              <span className="text-[#F26A4B] mr-2">•</span>
              Actualiza tu contraseña regularmente
            </li>
          </ul>
        </div>
      </div>

      {/* Enlaces adicionales */}
      <div className="text-center space-y-4">
        <p className="text-gray-600">
          ¿Recuerdas tu contraseña?{' '}
          <button
            type="button"
            onClick={() => onChangeView('login')}
            className="font-medium text-[#591117] hover:text-[#F26A4B] transition-colors"
          >
            Inicia sesión
          </button>
        </p>
        <p className="text-sm text-gray-500">
          ¿No tienes una cuenta?{' '}
          <button
            type="button"
            onClick={() => onChangeView('register')}
            className="text-[#591117] hover:text-[#F26A4B] transition-colors"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  )
}

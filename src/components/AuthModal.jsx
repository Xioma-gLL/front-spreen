import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/LanguageContext'
import { FcGoogle } from 'react-icons/fc'
import { IoClose, IoEye, IoEyeOff } from 'react-icons/io5'

// Asegúrate de que la ruta sea correcta
import localLogo from '../assets/logoo.png'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// ===== COMPONENTE PRINCIPAL DEL MODAL =====
export default function AuthModal({ isOpen, onClose, initialView = 'login' }) {
  const [currentView, setCurrentView] = useState(initialView)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCurrentView('login')
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
    <>
      {/* Estilos para ocultar scrollbar globalmente en este componente */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
          isAnimating ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'
        }`}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div 
          className={`relative bg-white w-full h-full md:h-[90vh] md:w-[95vw] md:max-w-7xl md:rounded-3xl shadow-2xl overflow-hidden flex transition-all duration-500 transform ${
            isAnimating 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-8'
          }`}
        >
          {/* Botón cerrar flotante */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur hover:bg-white text-gray-500 hover:text-[#591117] rounded-full shadow-md transition-all z-50 cursor-pointer border border-gray-100 group"
          >
            <IoClose className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* LADO IZQUIERDO: Imagen Decorativa */}
          <div className="hidden lg:flex lg:w-1/2 relative bg-[#591117]">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Hotel Atmosphere" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#591117] via-transparent to-transparent opacity-90"></div>
            
            <div className="relative z-10 flex flex-col justify-end p-16 text-white h-full">
              <h1 className="text-5xl font-bold mb-6 leading-tight">Experiencias inolvidables te esperan.</h1>
              <p className="text-xl text-gray-200 font-light">Accede a tu cuenta para gestionar tus reservas y disfrutar de beneficios exclusivos.</p>
            </div>
          </div>

          {/* LADO DERECHO: Formulario con Scroll Invisible */}
          <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white scrollbar-hide">
            <div className="min-h-full flex items-center justify-center p-6 md:p-12 lg:p-16">
              <div className="w-full max-w-md mx-auto">
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
          </div>
        </div>
      </div>
    </>
  )
}

// ===== CONTENIDO DE LOGIN =====
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
    <div className="space-y-8 animate-fadeIn">
      {/* Header con Logo Limpio */}
      <div className="text-center">
        <img
          src={localLogo}
          alt="Logo"
          className="mx-auto h-16 w-auto object-contain mb-6 hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-3xl font-bold text-[#591117] tracking-tight">
          Bienvenido de vuelta
        </h2>
        <p className="mt-2 text-gray-500 font-medium">
          Ingresa tus datos para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
            <div>
                <label htmlFor="modal-email" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
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
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F26A4B]/50 focus:border-[#F26A4B] outline-none transition-all duration-200 font-medium"
                placeholder="ejemplo@correo.com"
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                    <label htmlFor="modal-password" class="block text-sm font-semibold text-gray-700">
                    Contraseña
                    </label>
                    <button
                        type="button"
                        onClick={() => onChangeView('forgot')}
                        className="text-sm font-semibold text-[#F26A4B] hover:text-[#D94F30] transition-colors"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                <div className="relative group">
                <input
                    id="modal-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F26A4B]/50 focus:border-[#F26A4B] outline-none transition-all duration-200 font-medium"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 group-focus-within:text-[#F26A4B] transition-colors cursor-pointer"
                >
                    {showPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
                </button>
                </div>
            </div>
        </div>

        <div className="flex items-center">
            <input
            id="modal-rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="h-5 w-5 text-[#F26A4B] focus:ring-[#F26A4B] border-gray-300 rounded cursor-pointer transition-all"
            />
            <label htmlFor="modal-rememberMe" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
            Mantener sesión iniciada
            </label>
        </div>

        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#591117] to-[#8C0808] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#591117]/30 hover:shadow-[#591117]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
            {isLoading ? (
            <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Entrando...</span>
            </div>
            ) : (
            'Iniciar Sesión'
            )}
        </button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">O continúa con</span>
        </div>
      </div>

      <button
        onClick={() => handleSocialLogin('google')}
        className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 text-gray-700 font-semibold transition-all duration-200 group cursor-pointer"
      >
        <FcGoogle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span>Google</span>
      </button>

      <p className="text-center text-gray-600">
        ¿No tienes una cuenta?{' '}
        <button
          type="button"
          onClick={() => onChangeView('register')}
          className="font-bold text-[#F26A4B] hover:text-[#D94F30] hover:underline transition-all"
        >
          Regístrate gratis
        </button>
      </p>
    </div>
  )
}

// ===== CONTENIDO DE REGISTRO =====
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
    { code: '+52', country: 'mx', name: 'México', digits: 10, placeholder: '55 1234 5678' },
    { code: '+54', country: 'ar', name: 'Argentina', digits: 10, placeholder: '11 1234 5678' },
    { code: '+57', country: 'co', name: 'Colombia', digits: 10, placeholder: '300 123 4567' },
    { code: '+56', country: 'cl', name: 'Chile', digits: 9, placeholder: '9 1234 5678' },
    { code: '+1', country: 'us', name: 'USA', digits: 10, placeholder: '(555) 555-5555' },
    { code: '+34', country: 'es', name: 'España', digits: 9, placeholder: '612 345 678' },
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
    <div className="space-y-6 animate-fadeIn pb-4">
      <div className="text-center">
        <img
          src={localLogo}
          alt="Logo"
          className="mx-auto h-16 w-auto object-contain mb-4 hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-2xl font-bold text-[#591117]">
          Crea tu cuenta
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Únete y disfruta de beneficios exclusivos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombres */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 ml-1">Nombre</label>
            <input
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F26A4B] outline-none transition-all"
              placeholder="Nombre"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 ml-1">Apellido</label>
            <input
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F26A4B] outline-none transition-all"
              placeholder="Apellido"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 ml-1">Email</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F26A4B] outline-none transition-all"
            placeholder="tu@email.com"
          />
        </div>

        {/* Teléfono */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 ml-1">Teléfono</label>
          <div className="flex gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPrefixDropdown(!showPrefixDropdown)}
                className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className={`fi fi-${selectedCountry.country}`}></span>
                <span className="text-sm font-medium">{formData.phonePrefix}</span>
              </button>
              {showPrefixDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-48 overflow-y-auto w-64 scrollbar-hide">
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, phonePrefix: country.code }))
                        setShowPrefixDropdown(false)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50 text-sm text-left border-b border-gray-50 last:border-0"
                    >
                      <span className={`fi fi-${country.country}`}></span>
                      <span className="flex-1 font-medium text-gray-700">{country.name}</span>
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
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F26A4B] outline-none transition-all"
              placeholder={selectedCountry.placeholder}
            />
          </div>
        </div>

        {/* Passwords */}
        <div className="space-y-4">
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 ml-1">Contraseña</label>
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F26A4B] outline-none transition-all"
                        placeholder="Mínimo 6 caracteres"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#591117]"
                    >
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 ml-1">Confirmar Contraseña</label>
                <div className="relative">
                    <input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F26A4B] outline-none transition-all"
                        placeholder="Repite la contraseña"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#591117]"
                    >
                        {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                </div>
            </div>
        </div>

        <div className="flex items-start gap-3 py-2">
          <input
            id="modal-acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-[#F26A4B] focus:ring-[#F26A4B] border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="modal-acceptTerms" className="text-xs text-gray-600 leading-snug">
            Acepto los <span className="text-[#591117] font-semibold hover:underline cursor-pointer">términos y condiciones</span> y la <span className="text-[#591117] font-semibold hover:underline cursor-pointer">política de privacidad</span>.
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#591117] to-[#8C0808] text-white py-3 rounded-xl font-bold shadow-lg shadow-[#591117]/20 hover:shadow-[#591117]/40 hover:scale-[1.01] transition-all disabled:opacity-70"
        >
          {isLoading ? 'Registrando...' : 'Crear Cuenta'}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => onChangeView('login')}
            className="font-bold text-[#F26A4B] hover:text-[#D94F30] transition-colors"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  )
}

// ===== CONTENIDO DE RECUPERAR CONTRASEÑA =====
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
      <div className="space-y-8 text-center animate-fadeIn py-10">
        <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">¡Correo enviado!</h2>
            <p className="text-gray-600 max-w-xs mx-auto">
            Hemos enviado las instrucciones a <strong>{email}</strong>
            </p>
        </div>
        <button
          onClick={() => onChangeView('login')}
          className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all"
        >
          Volver al login
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <img
          src={localLogo}
          alt="Logo"
          className="mx-auto h-16 w-auto object-contain mb-6 hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-2xl font-bold text-[#591117]">Recuperar contraseña</h2>
        <p className="text-gray-500 mt-2">
          Ingresa tu email y te enviaremos las instrucciones
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F26A4B] outline-none transition-all"
              placeholder="nombre@ejemplo.com"
            />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#591117] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#8C0808] transition-all disabled:opacity-70"
        >
          {isLoading ? 'Enviando...' : 'Enviar enlace'}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => onChangeView('login')}
          className="text-sm font-semibold text-gray-500 hover:text-[#591117] transition-colors flex items-center justify-center gap-2 w-full"
        >
          ← Volver al inicio de sesión
        </button>
      </div>
    </div>
  )
}
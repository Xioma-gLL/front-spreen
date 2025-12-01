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
import 'flag-icons/css/flag-icons.min.css'

export default function RegisterPage() {
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
  const navigate = useNavigate()
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
    console.log('RegisterPage.handleSubmit called with', formData)
    
    if (formData.password !== formData.confirmPassword) {
      window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Las contraseñas no coinciden', duration: 4000 } }))
      return
    }
    
    setIsLoading(true)
    
    try {
      const result = await register(formData)
      if (result.success) {
        window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Registro realizado con éxito', duration: 3500 } }))
        navigate('/')
      } else {
        window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: result.message || 'Error en el registro', duration: 4000 } }))
      }
    } catch (error) {
      console.error('Registration error:', error)
      window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Error en el registro', duration: 4000 } }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = (provider) => {
    // Redirigir al backend para OAuth (igual que login)
    window.location.href = `http://localhost:8080/oauth2/authorize/${provider}`
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
            Crea tu cuenta
          </h2>
          <p className="text-gray-600">
            Regístrate y comienza tu experiencia con nosotros
          </p>
        </div>

        {/* Formulario de registro */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#591117]/10 p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombres */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                  placeholder="Ingresa tu apellido"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono (opcional)
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPrefixDropdown(!showPrefixDropdown)}
                    className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200 bg-white cursor-pointer hover:bg-gray-50"
                  >
                    <span className={`fi fi-${selectedCountry.country} rounded-sm`}></span>
                    <span className="text-sm">{selectedCountry.code}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showPrefixDropdown && (
                    <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, phonePrefix: country.code }))
                            setShowPrefixDropdown(false)
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-[#FFF7F7] cursor-pointer transition-colors ${
                            formData.phonePrefix === country.code ? 'bg-[#FFF7F7]' : ''
                          }`}
                        >
                          <span className={`fi fi-${country.country} rounded-sm`}></span>
                          <span className="text-sm flex-1 text-left">{country.name}</span>
                          <span className="text-sm text-gray-500">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                  placeholder={selectedCountry.placeholder}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
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

            {/* Confirmar contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOffIcon className="text-gray-400" /> : <EyeIcon className="text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="flex items-start">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                required
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#F21905] focus:ring-[#F26A4B] border-gray-300 rounded mt-1 cursor-pointer"
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Acepto los{' '}
                <Link to="/terminos" className="text-[#591117] hover:text-[#F26A4B] cursor-pointer">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link to="/privacidad" className="text-[#591117] hover:text-[#F26A4B] cursor-pointer">
                  política de privacidad
                </Link>
              </label>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#591117] to-[#F26A4B] text-white py-3 px-4 rounded-lg font-medium hover:from-[#F21905] hover:to-[#8C0808] focus:outline-none focus:ring-2 focus:ring-[#F26A4B] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creando cuenta...
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
            <Link
              to="/login"
              className="font-medium text-[#591117] hover:text-[#F26A4B] transition-colors cursor-pointer"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
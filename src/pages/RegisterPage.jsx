import { useState } from 'react'
import { useI18n } from '../context/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
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
      alert('Las contraseñas no coinciden')
      return
    }
    
    setIsLoading(true)
    
    try {
      await register(formData)
      window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Registro realizado con éxito', duration: 3500 } }))
      navigate('/')
    } catch (error) {
      console.error('Registration error:', error)
      window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Error en el registro', duration: 4000 } }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`)
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
                  {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
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
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
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

          {/* Botones de registro social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialRegister('google')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200 cursor-pointer"
            >
              <FcGoogle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialRegister('facebook')}
              className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#FFF7F7] transition-colors duration-200 cursor-pointer"
            >
              <FaFacebook className="text-blue-600 w-5 h-5" />
            </button>
          </div>
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
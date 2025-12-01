import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular envío de correo de recuperación
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      console.log('Password reset email sent to:', email)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] to-[#FFF5F5] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Icono de éxito */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#591117] to-[#F26A4B] rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#591117] mb-2">
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
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#591117] to-[#F26A4B] text-white font-medium rounded-lg hover:from-[#F21905] hover:to-[#8C0808] transition-all duration-200"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    )
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
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
            >
              Inicia sesión
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/registro"
              className="text-orange-600 hover:text-orange-500 transition-colors"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
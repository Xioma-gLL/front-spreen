import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaCreditCard, FaCheck } from 'react-icons/fa'
import { SiVisa, SiMastercard, SiAmericanexpress } from 'react-icons/si'

export default function InfoModal({ isOpen, onClose }) {
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

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-100 flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'bg-black/50' : 'bg-transparent'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300 transform scrollbar-hide ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Header del modal */}
        <div className="sticky top-0 bg-white z-10 px-8 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#591117]">Hotel Plaza Trujillo</h2>
            <a 
              href="https://plazatrujillo.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full hover:bg-green-100 transition-colors"
            >
              <FaCheck className="w-3 h-3" />
              Página web oficial
            </a>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="px-8 py-6">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Mapa - ocupa 3 columnas */}
            <div className="md:col-span-3 rounded-xl overflow-hidden shadow-lg h-[300px] md:h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.6661814744736!2d-79.02974513041772!3d-8.113098399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d7c54d3e6af%3A0x5a0c1c4e4a2c1c1c!2sJr.%20Bol%C3%B3gnesi%20344%2C%20Trujillo%2013001!5e0!3m2!1ses!2spe!4v1701430800000!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Hotel Plaza Trujillo"
              />
            </div>

            {/* Información de contacto - ocupa 2 columnas */}
            <div className="md:col-span-2 space-y-6">
              {/* Donde estamos */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Donde estamos
                </h3>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700">
                    Jr. Bolognesi 344, Centro Histórico,<br />
                    Trujillo - 13001, La Libertad, Perú
                  </p>
                </div>
              </div>

              {/* Coordenadas GPS */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Coordenadas GPS
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">⊕</span>
                    <span>Latitud: -8.1130984</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">⊕</span>
                    <span>Longitud: -79.0297451</span>
                  </div>
                </div>
              </div>

              {/* Contáctanos */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Contáctanos
                </h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:reservas@plazatrujillo.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-[#591117] transition-colors"
                  >
                    <div className="p-2 bg-gray-100 rounded-full">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    reservas@plazatrujillo.com
                  </a>
                  <a 
                    href="tel:+51992810971"
                    className="flex items-center gap-3 text-gray-700 hover:text-[#591117] transition-colors"
                  >
                    <div className="p-2 bg-gray-100 rounded-full">
                      <FaPhone className="w-4 h-4" />
                    </div>
                    +51 992 810 971
                  </a>
                  <a 
                    href="https://wa.me/51992810971"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                      <FaWhatsapp className="w-4 h-4" />
                    </div>
                    WhatsApp: +51 992 810 971
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sección inferior */}
          <div className="mt-8 pt-6 border-t border-gray-200 grid md:grid-cols-2 gap-8">
            {/* Tarjetas de crédito */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Se aceptan tarjetas de crédito
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <SiVisa className="w-10 h-6 text-[#1A1F71]" />
                </div>
                <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <SiMastercard className="w-10 h-6 text-[#EB001B]" />
                </div>
                <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <SiAmericanexpress className="w-10 h-6 text-[#006FCF]" />
                </div>
                <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">DINERS</span>
                </div>
                <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-[#F47216]">DISCOVER</span>
                </div>
              </div>
            </div>

            {/* Por qué reservar */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                ¿Por qué reservar?
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <FaCheck className="w-4 h-4 text-green-500" />
                  Mejor precio garantizado
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <FaCheck className="w-4 h-4 text-green-500" />
                  Reserva directa, sin intermediario
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <FaCheck className="w-4 h-4 text-green-500" />
                  Ofertas y beneficios exclusivos
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
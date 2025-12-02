import { useState, useEffect } from 'react'
import { useI18n } from '../context/LanguageContext'

const IconClose = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const IconChevron = ({ className = 'w-4 h-4', isOpen }) => (
  <svg className={`${className} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export default function PolicyModal({ isOpen, onClose, type }) {
  const { lang } = useI18n()
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})
  
  // Estados para configuración de cookies
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true
  })

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
      document.body.style.overflow = 'hidden'
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setShouldRender(false), 300)
      document.body.style.overflow = ''
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => onClose(), 300)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleSaveCookies = () => {
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings))
    handleClose()
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  if (!shouldRender) return null

  const cookieCategories = [
    {
      id: 'necessary',
      name: lang === 'en' ? 'Necessary' : 'Necesario',
      required: true,
      description: lang === 'en' 
        ? 'Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.'
        : 'Las cookies necesarias ayudan a hacer una página web utilizable activando funciones básicas como la navegación en la página y el acceso a áreas seguras de la página web. La página web no puede funcionar adecuadamente sin estas cookies.'
    }
  ]

  // Secciones expandibles para política de privacidad
  const privacySections = [
    {
      id: 'collect',
      title: lang === 'en' ? 'Information We Collect' : 'Información que Recopilamos',
      content: lang === 'en' 
        ? 'We collect personal information that you provide directly to us, such as your name, email address, phone number, and payment information when you make a reservation.'
        : 'Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, número de teléfono e información de pago cuando realiza una reserva.'
    },
    {
      id: 'use',
      title: lang === 'en' ? 'How We Use Your Information' : 'Cómo Usamos su Información',
      content: lang === 'en'
        ? 'We use the information we collect to process reservations, communicate with you about your stay, improve our services, and send promotional communications (with your consent).'
        : 'Utilizamos la información que recopilamos para procesar reservas, comunicarnos con usted sobre su estadía, mejorar nuestros servicios y enviar comunicaciones promocionales (con su consentimiento).'
    },
    {
      id: 'protection',
      title: lang === 'en' ? 'Data Protection' : 'Protección de Datos',
      content: lang === 'en'
        ? 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.'
        : 'Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, alteración, divulgación o destrucción.'
    },
    {
      id: 'rights',
      title: lang === 'en' ? 'Your Rights' : 'Sus Derechos',
      content: lang === 'en'
        ? 'You have the right to access, correct, or delete your personal data. You can also object to processing or request data portability. Contact us at reservas@plazatrujillo.com to exercise these rights.'
        : 'Usted tiene derecho a acceder, corregir o eliminar sus datos personales. También puede oponerse al procesamiento o solicitar la portabilidad de datos. Contáctenos en reservas@plazatrujillo.com para ejercer estos derechos.'
    },
    {
      id: 'contact',
      title: lang === 'en' ? 'Contact' : 'Contacto',
      content: lang === 'en'
        ? 'If you have any questions about this Privacy Policy, please contact us at: reservas@plazatrujillo.com or call +51 992810971.'
        : 'Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en: reservas@plazatrujillo.com o llame al +51 992810971.'
    }
  ]

  // Secciones expandibles para política de cookies
  const cookiePolicySections = [
    {
      id: 'what',
      title: lang === 'en' ? 'What are Cookies?' : '¿Qué son las Cookies?',
      content: lang === 'en'
        ? 'Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.'
        : 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a brindarle una mejor experiencia al recordar sus preferencias y entender cómo utiliza nuestro sitio.'
    },
    {
      id: 'types',
      title: lang === 'en' ? 'Types of Cookies' : 'Tipos de Cookies',
      content: lang === 'en'
        ? 'We use necessary cookies that are essential for the website to function properly. These cookies enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.'
        : 'Utilizamos cookies necesarias que son esenciales para que el sitio web funcione correctamente. Estas cookies habilitan funciones básicas como la navegación y el acceso a áreas seguras. El sitio web no puede funcionar correctamente sin estas cookies.'
    },
    {
      id: 'manage',
      title: lang === 'en' ? 'Managing Cookies' : 'Gestión de Cookies',
      content: lang === 'en'
        ? 'You can manage your cookie preferences through the "Cookie Settings" option in our footer, or through your browser settings. Note that disabling necessary cookies may affect the functionality of our website.'
        : 'Puede gestionar sus preferencias de cookies a través de la opción "Configuración de cookies" en nuestro pie de página, o a través de la configuración de su navegador. Tenga en cuenta que deshabilitar las cookies necesarias puede afectar la funcionalidad de nuestro sitio web.'
    }
  ]

  const content = {
    privacy: {
      title: 'Hotel Plaza Trujillo',
      subtitle: lang === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
      intro: lang === 'en'
        ? 'At Hotel Plaza Trujillo, we are committed to protecting your privacy. This policy describes how we collect, use, and protect your personal information when you use our services.'
        : 'En Hotel Plaza Trujillo, estamos comprometidos con la protección de tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestros servicios.',
      sections: privacySections,
      buttonText: lang === 'en' ? 'I understand' : 'Entendido'
    },
    cookies: {
      title: 'Hotel Plaza Trujillo',
      subtitle: lang === 'en' ? 'Cookie Policy' : 'Política de Cookies',
      intro: lang === 'en'
        ? 'We use cookies to improve your browsing experience. Here you can learn about our cookie usage and how they help us provide you with a better service.'
        : 'Utilizamos cookies para mejorar tu experiencia de navegación. Aquí puedes conocer sobre el uso de cookies y cómo nos ayudan a brindarte un mejor servicio.',
      sections: cookiePolicySections,
      buttonText: lang === 'en' ? 'I understand' : 'Entendido'
    },
    settings: {
      title: 'Hotel Plaza Trujillo',
      subtitle: null,
      intro: lang === 'en'
        ? 'Hello! Could we enable some additional services? You can always change or withdraw your consent later. Here you can evaluate and personalize the services we would like to use on this website. You decide! Enable or disable services as you see fit. To learn more, please read our '
        : '¡Hola! ¿Podríamos habilitar algunos servicios adicionales? Siempre podrás cambiar o retirar tu consentimiento más adelante. Aquí podrás evaluar y personalizar los servicios que nos gustaría utilizar en este sitio web. ¡Tú decides! Habilita o deshabilita los servicios como mejor te parezca. Para saber más, por favor lee nuestra ',
      sections: cookieCategories,
      buttonText: lang === 'en' ? 'save' : 'guardar'
    }
  }

  const currentContent = content[type] || content.privacy

  // Renderizado para privacy y cookies (mismo diseño)
  const renderPolicyContent = () => (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm leading-relaxed">
        {currentContent.intro}
      </p>
      
      {/* Secciones expandibles */}
      <div className="space-y-3">
        {currentContent.sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Section header */}
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-gray-800 text-left">{section.title}</span>
              <IconChevron className="w-5 h-5 text-gray-400" isOpen={expandedSections[section.id]} />
            </button>
            
            {/* Expanded content */}
            <div className={`overflow-hidden transition-all duration-300 ${
              expandedSections[section.id] ? 'max-h-48' : 'max-h-0'
            }`}>
              <div className="px-4 pb-4 pt-0">
                <p className="text-sm text-gray-500 leading-relaxed">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleClose}
        className="w-full py-4 bg-[#591117] text-white rounded-lg font-medium hover:bg-[#6d1a22] transition-colors cursor-pointer text-lg"
      >
        {currentContent.buttonText}
      </button>
    </div>
  )

  // Renderizado para settings (configuración de cookies)
  const renderSettingsContent = () => (
    <div className="space-y-6">
      <p className="text-gray-600 text-sm leading-relaxed">
        {currentContent.intro}
        <button 
          type="button" 
          onClick={() => { onClose(); setTimeout(() => document.querySelector('[data-policy="privacy"]')?.click(), 350) }}
          className="text-[#591117] hover:text-[#6d1a22] font-medium cursor-pointer"
        >
          {lang === 'en' ? 'privacy policy' : 'política de privacidad'}
        </button>
        .
      </p>
      
      {/* Cookie categories */}
      <div className="space-y-3">
        {cookieCategories.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Category header */}
            <div className="flex items-center justify-between p-4 bg-white">
              <div className="flex items-center gap-3">
                {/* Toggle */}
                <button
                  type="button"
                  disabled={category.required}
                  onClick={() => !category.required && setCookieSettings(prev => ({ ...prev, [category.id]: !prev[category.id] }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    category.required || cookieSettings[category.id] 
                      ? 'bg-[#591117]' 
                      : 'bg-gray-300'
                  } ${category.required ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    category.required || cookieSettings[category.id] ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
                
                {/* Name */}
                <div>
                  <span className="font-semibold text-gray-800">{category.name}</span>
                  {category.required && (
                    <span className="text-gray-400 text-sm ml-1">({lang === 'en' ? 'always required' : 'siempre requerido'})</span>
                  )}
                </div>
              </div>
              
              {/* Expand button */}
              <button
                type="button"
                onClick={() => toggleSection(category.id)}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <IconChevron className="w-5 h-5" isOpen={expandedSections[category.id]} />
              </button>
            </div>
            
            {/* Expanded description */}
            <div className={`overflow-hidden transition-all duration-300 ${
              expandedSections[category.id] ? 'max-h-40' : 'max-h-0'
            }`}>
              <div className="px-4 pb-4 pt-0">
                <p className="text-sm text-gray-500 leading-relaxed">{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <button
        type="button"
        onClick={handleSaveCookies}
        className="w-full py-4 bg-[#591117] text-white rounded-lg font-medium hover:bg-[#6d1a22] transition-colors cursor-pointer text-lg"
      >
        {currentContent.buttonText}
      </button>
    </div>
  )

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{currentContent.title}</h2>
            {currentContent.subtitle && (
              <p className="text-[#591117] font-medium mt-1">{currentContent.subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <IconClose className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(85vh-100px)] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {type === 'settings' ? renderSettingsContent() : renderPolicyContent()}
        </div>
      </div>
    </div>
  )
}

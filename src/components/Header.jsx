import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useI18n } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import InfoModal from './InfoModal'
import ProfileModal from './ProfileModal'

// Small inline icon components (SVG)
const IconUser = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z" />
  </svg>
)
const IconUserCircle = ({ className = 'w-8 h-8' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a3 3 0 110 6 3 3 0 010-6zm0 12.2c-2.5 0-4.71-1-6.33-2.57.03-1.99 4-3.08 6.33-3.08 2.33 0 6.3 1.09 6.33 3.08A8.13 8.13 0 0112 18.2z" />
  </svg>
)
const IconSignOut = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
)
const IconSignIn = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 17l5-5-5-5v3H3v4h7v3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
)
const IconUserPlus = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 14c2.7 0 8 1.34 8 4v1h-6v-1c0-1.03-1.91-2-4-2-2.09 0-4 .97-4 2v1H3v-1c0-2.66 5.3-4 8-4 1.73 0 3.15.51 4 1.2V14zm-3-9a3 3 0 100 6 3 3 0 000-6zm9 1h-2v2h-2v2h2v2h2v-2h2v-2h-2z" />
  </svg>
)
const IconPhone = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)
const IconMail = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)
const IconLocation = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const navLinks = [
  { key: 'pages.home.title', href: '/' },
  { key: 'nav.info', href: '/info' },
]

export default function Header() {
  // Verificar si se debe abrir el modal de login al inicializar
  const shouldOpenLoginOnMount = () => {
    const shouldOpen = sessionStorage.getItem('openLoginModal') === 'true'
    if (shouldOpen) {
      sessionStorage.removeItem('openLoginModal')
    }
    return shouldOpen
  }

  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false)
  const [currency, setCurrency] = useState('PEN')
  const [authModalOpen, setAuthModalOpen] = useState(shouldOpenLoginOnMount)
  const [authModalView, setAuthModalView] = useState('login')
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [profileModalSection, setProfileModalSection] = useState('profile')
  const { lang, setLang, t } = useI18n()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  // Refs para detectar clics fuera de los dropdowns
  const userMenuRef = useRef(null)
  const currencyMenuRef = useRef(null)

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(event.target)) {
        setCurrencyMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Función para abrir un dropdown y cerrar los demás
  const toggleUserMenu = () => {
    setCurrencyMenuOpen(false)
    setUserMenuOpen(!userMenuOpen)
  }

  const toggleCurrencyMenu = () => {
    setUserMenuOpen(false)
    setCurrencyMenuOpen(!currencyMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setAuthModalOpen(true)
  }

  const currencies = [
    { code: 'PEN', symbol: 'S/.', name: 'PE Nuevo Sol' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
  ]

  const currentCurrency = currencies.find(c => c.code === currency)

  const openAuthModal = (view = 'login') => {
    setAuthModalView(view)
    setAuthModalOpen(true)
  }

  return (
    <>
      {/* ===== BARRA SUPERIOR DE INFORMACIÓN ===== */}
      <div className="bg-[#f8f8f8] border-b border-gray-200 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            {/* Izquierda: Mensaje */}
            <div className="flex items-center text-gray-600">
              <span className="font-medium text-[#591117]">Página web oficial</span>
              <span className="mx-2">·</span>
              <span className="text-[#6B8E23]">Mejor precio garantizado</span>
            </div>

            {/* Derecha: Contacto e idioma */}
            <div className="flex items-center gap-6">
              <a href="tel:+51992810971" className="group flex items-center gap-1.5 text-gray-600 hover:text-[#591117] transition-colors">
                <IconPhone className="w-4 h-4" />
                <span className="relative">
                  +51 992810971
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#591117] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </a>
              <a href="mailto:reservas@plazatrujillo.com" className="group flex items-center gap-1.5 text-gray-600 hover:text-[#591117] transition-colors">
                <IconMail className="w-4 h-4" />
                <span className="relative">
                  reservas@plazatrujillo.com
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#591117] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </a>
              <div ref={currencyMenuRef} className="relative flex items-center gap-1 text-gray-600">
                <button
                  type="button"
                  onClick={toggleCurrencyMenu}
                  className="flex items-center gap-1 hover:text-[#591117] transition-colors cursor-pointer"
                >
                  <span>{currentCurrency?.symbol}</span>
                  <span>{currentCurrency?.code}</span>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown de monedas */}
                {currencyMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-100">
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => { setCurrency(c.code); setCurrencyMenuOpen(false) }}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${currency === c.code ? 'text-[#591117] font-medium' : 'text-gray-700'}`}
                      >
                        <span className="w-6">{c.symbol}</span>
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Selector de idioma */}
              <div className="flex items-center border-l border-gray-300 pl-4">
                {lang === 'en' ? (
                  <button 
                    type="button" 
                    onClick={() => setLang('es')} 
                    className="flex items-center gap-2 text-gray-600 hover:text-[#591117] transition-colors cursor-pointer"
                  >
                    <span className="fi fi-es text-lg"></span>
                    <span>Español</span>
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => setLang('en')} 
                    className="flex items-center gap-2 text-gray-600 hover:text-[#591117] transition-colors cursor-pointer"
                  >
                    <span className="fi fi-us text-lg"></span>
                    <span>English</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HEADER PRINCIPAL ===== */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo y dirección */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 cursor-pointer">
                <img
                  src="https://plazatrujillo.com/wp-content/uploads/2025/09/cropped-logo-plaza-trujillo-192x192.webp"
                  alt="Plaza Trujillo Hotel"
                  className="h-12 w-12 rounded-full border-2 border-gray-100"
                />
                <div className="hidden sm:flex items-center gap-2">
                  <span className="font-semibold text-[#591117]">Hotel Plaza Trujillo</span>
                  <span className="text-yellow-500 text-sm">★★★</span>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <IconLocation className="w-3 h-3" />
                    <span>Jr. Bolognesi 344 – Centro – Trujillo</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Navegación Desktop y Botón de autenticación */}
            <div className="hidden md:flex items-center gap-6">
              {/* Links de navegación */}
              <nav className="flex items-center gap-6">
                {navLinks.map((l) => (
                  l.href === '/info' ? (
                    <button
                      key={l.key}
                      onClick={() => setInfoModalOpen(true)}
                      className="text-gray-700 hover:text-[#591117] font-medium transition-colors cursor-pointer"
                    >
                      {t(l.key)}
                    </button>
                  ) : (
                    <NavLink
                      key={l.key}
                      to={l.href}
                      className={({ isActive }) =>
                        `text-gray-700 hover:text-[#591117] font-medium transition-colors ${isActive ? 'text-[#591117]' : ''}`
                      }
                    >
                      {t(l.key)}
                    </NavLink>
                  )
                ))}
              </nav>

              {/* Botón de autenticación */}
              {isAuthenticated ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
                  >
                    {user?.photoUrl ? (
                      <img 
                        src={user.photoUrl} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#591117] flex items-center justify-center text-white font-semibold text-sm">
                        {user?.firstName?.charAt(0)?.toUpperCase()}{user?.lastName?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium">{user?.firstName} {user?.lastName}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => { setProfileModalSection('reservations'); setProfileModalOpen(true); setUserMenuOpen(false) }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <svg className="mr-3 w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                        </svg>
                        Mis Reservas
                      </button>
                      <button
                        onClick={() => { setProfileModalSection('profile'); setProfileModalOpen(true); setUserMenuOpen(false) }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <IconUser className="mr-3 w-4 h-4" />
                        Mi perfil
                      </button>
                      <button
                        onClick={() => { handleLogout(); setUserMenuOpen(false) }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                      >
                        <IconSignOut className="mr-3 w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="bg-[#591117] hover:bg-[#7a171f] text-white px-6 py-2.5 rounded-full font-medium transition-colors cursor-pointer"
                >
                  Iniciar sesión
                </button>
              )}
            </div>

            {/* Botón hamburguesa móvil */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded text-[#591117] hover:bg-gray-100"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{t('nav.open_menu')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M3.75 6.75h16.5v1.5H3.75zM3.75 11.25h16.5v1.5H3.75zM3.75 15.75h16.5v1.5H3.75z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {open && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((l) => (
                l.href === '/info' ? (
                  <button
                    key={l.key}
                    onClick={() => { setInfoModalOpen(true); setOpen(false) }}
                    className="block py-2 text-gray-700 hover:text-[#591117] cursor-pointer w-full text-left"
                  >
                    {t(l.key)}
                  </button>
                ) : (
                  <NavLink 
                    key={l.key} 
                    to={l.href} 
                    className={({ isActive }) =>
                      `block py-2 text-gray-700 hover:text-[#591117] ${isActive ? 'text-[#591117] font-medium' : ''}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {t(l.key)}
                  </NavLink>
                )
              ))}

              {/* Información de contacto móvil */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <a href="tel:+51992810971" className="flex items-center gap-2 text-sm text-gray-600">
                  <IconPhone className="w-4 h-4" />
                  <span>+51 992810971</span>
                </a>
                <a href="mailto:reservas@plazatrujillo.com" className="flex items-center gap-2 text-sm text-gray-600">
                  <IconMail className="w-4 h-4" />
                  <span>reservas@plazatrujillo.com</span>
                </a>
              </div>

              {/* Selector de idioma móvil */}
              <div className="pt-3 border-t border-gray-200">
                {lang === 'en' ? (
                  <button 
                    type="button" 
                    onClick={() => { setLang('es'); setOpen(false) }} 
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <span className="fi fi-es text-lg"></span>
                    <span>Cambiar a Español</span>
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => { setLang('en'); setOpen(false) }} 
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <span className="fi fi-us text-lg"></span>
                    <span>Switch to English</span>
                  </button>
                )}
              </div>

              {/* Autenticación móvil */}
              <div className="pt-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 pb-3 mb-2 border-b border-gray-100">
                      {user?.photoUrl ? (
                        <img src={user.photoUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#591117] flex items-center justify-center text-white font-semibold">
                          {user?.firstName?.charAt(0)?.toUpperCase()}{user?.lastName?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setProfileModalSection('reservations'); setProfileModalOpen(true); setOpen(false) }}
                      className="flex items-center py-2 text-gray-700 hover:text-[#591117] w-full"
                    >
                      <svg className="mr-3 w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                      </svg>
                      Mis Reservas
                    </button>
                    <button 
                      onClick={() => { setProfileModalSection('profile'); setProfileModalOpen(true); setOpen(false) }}
                      className="flex items-center py-2 text-gray-700 hover:text-[#591117] w-full"
                    >
                      <IconUser className="mr-3 w-4 h-4" />
                      Mi perfil
                    </button>
                    <button 
                      onClick={() => { handleLogout(); setOpen(false) }} 
                      className="flex items-center py-2 text-red-600"
                    >
                      <IconSignOut className="mr-3 w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => { setOpen(false); openAuthModal('login') }}
                      className="bg-[#591117] hover:bg-[#7a171f] text-white px-4 py-2.5 rounded-full font-medium text-center transition-colors"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      onClick={() => { setOpen(false); openAuthModal('register') }}
                      className="border border-[#591117] text-[#591117] hover:bg-[#591117] hover:text-white px-4 py-2.5 rounded-full font-medium text-center transition-colors"
                    >
                      Registrarse
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modal de autenticación */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialView={authModalView}
      />

      {/* Modal de información */}
      <InfoModal 
        isOpen={infoModalOpen} 
        onClose={() => setInfoModalOpen(false)}
      />

      {/* Modal de perfil */}
      <ProfileModal 
        isOpen={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)}
        onLogout={() => { setProfileModalOpen(false); handleLogout() }}
        initialSection={profileModalSection}
      />

      {/* Spacer para contenido */}
      <div aria-hidden className="h-0 md:h-0"></div>
    </>
  )
}
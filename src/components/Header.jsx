import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useI18n } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import InfoModal from './InfoModal'
import ProfileModal from './ProfileModal'

// IMPORTANTE: Importamos tu nuevo logo aquí
import logoPlaza from '../assets/logoo.png'

// --- ICONOS ---
const IconUser = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z" />
  </svg>
)
const IconSignOut = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
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
const IconHome = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
)
const IconInfo = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
)
const IconBook = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.207 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.793 18 7.5 18s3.332.477 4.5 1.247m0-13C13.168 5.477 14.793 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.207 18 16.5 18s-3.332.477-4.5 1.247" />
  </svg>
)
const IconLocation = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
)
const IconStar = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const navLinks = [
  { key: 'pages.home.title', href: '/', icon: IconHome },
  { key: 'nav.info', href: '/info', icon: IconInfo },
]

export default function Header() {
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

  const userMenuRef = useRef(null)
  const currencyMenuRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

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
      {/* ===== ESTILOS PARA ELIMINAR BARRA DE SCROLL ===== */}
      <style>
        {`
          /* Ocultar barra de scroll para Chrome, Safari y Opera */
          ::-webkit-scrollbar {
            display: none;
          }
          /* Ocultar barra de scroll para IE, Edge y Firefox */
          html, body {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
            overflow-x: hidden; /* Prevenir scroll horizontal */
          }
        `}
      </style>

      {/* ===== BARRA SUPERIOR (Top Bar) - ANCHO COMPLETO ===== */}
      <div className="bg-[#f8f9fa] border-b border-gray-100 text-[11px] uppercase tracking-wider font-semibold text-gray-500 hidden lg:block w-full">
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-between h-10">
            {/* Izquierda */}
            <div className="flex items-center gap-4">
              <span className="text-[#591117] hover:opacity-80 transition-opacity cursor-default">
                Sitio Oficial
              </span>
              <span className="w-px h-3 bg-gray-300"></span>
              <span className="flex items-center gap-1.5 text-[#6B8E23]">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Mejor Precio Garantizado
              </span>
            </div>

            {/* Derecha */}
            <div className="flex items-center gap-8">
              <a href="tel:+51992810971" className="hover:text-[#591117] transition-colors flex items-center gap-2">
                <IconPhone className="w-3.5 h-3.5 text-[#591117] mb-0.5" />
                +51 992 810 971
              </a>
              <div className="relative group">
                <a href="mailto:reservas@plazatrujillo.com" className="hover:text-[#591117] transition-colors flex items-center gap-2">
                  <IconMail className="w-3.5 h-3.5 text-[#591117] mb-0.5" />
                  RESERVAS
                </a>
              </div>
              
              <div className="flex items-center gap-4 border-l border-gray-300 pl-6">
                {/* Moneda */}
                <div ref={currencyMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={toggleCurrencyMenu}
                    className="flex items-center gap-1 hover:text-[#591117] transition-colors cursor-pointer"
                  >
                    <span>{currentCurrency?.code}</span>
                    <svg className={`w-3 h-3 transition-transform duration-300 ${currencyMenuOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {currencyMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-32 bg-white rounded-md shadow-2xl border border-gray-100 py-1 z-50">
                      {currencies.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => { setCurrency(c.code); setCurrencyMenuOpen(false) }}
                          className={`block w-full text-left px-4 py-2 text-[11px] hover:bg-gray-50 cursor-pointer ${currency === c.code ? 'text-[#591117] font-bold bg-gray-50' : 'text-gray-500'}`}
                        >
                          {c.code} - {c.symbol}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Idioma */}
                <button 
                  type="button" 
                  onClick={() => setLang(lang === 'en' ? 'es' : 'en')} 
                  className="hover:text-[#591117] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span className={`fi fi-${lang === 'en' ? 'us' : 'es'} rounded-sm shadow-sm`}></span>
                  <span>{lang === 'en' ? 'EN' : 'ES'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HEADER PRINCIPAL - ANCHO COMPLETO - AJUSTADO A H-16 ===== */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 **h-16**"> 
        {/* ALTURA CAMBIADA DE h-20 A h-16 para hacerlo más delgado */}
        <div className="w-full px-4 sm:px-6 lg:px-10 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* LADO IZQUIERDO: Logo totalmente a la izquierda */}
            <div className="flex items-center flex-shrink-0">
                {/* Botón Hamburguesa (SOLO MÓVIL) */}
                <button
                    type="button"
                    className="lg:hidden p-2 -ml-2 rounded-full text-gray-600 hover:bg-gray-50 hover:text-[#591117] transition-all focus:outline-none mr-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Menú"
                >
                    <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {open ? (
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Logo AJUSTADO (Más pequeño) */}
                <Link to="/" className="flex items-center group">
                    <img
                        src={logoPlaza}
                        alt="Plaza Trujillo Hotel"
                        className="**h-5 sm:h-6** w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                        // Altura reducida de h-10/h-11 a h-5/h-6 (aproximadamente 3 veces más pequeño en el valor de la clase)
                    />
                </Link>
            </div>

            {/* LADO DERECHO: Navegación + Estrellas + Auth */}
            <div className="flex items-center gap-8 lg:gap-12">
                
                {/* Navegación Desktop - Texto ajustado */}
                <div className="hidden lg:flex items-center gap-8">
                    <nav className="flex items-center gap-8">
                        {navLinks.map((l) => (
                        l.href === '/info' ? (
                            <button
                            key={l.key}
                            onClick={() => setInfoModalOpen(true)}
                            className="text-gray-700 hover:text-[#591117] text-[15px] font-semibold tracking-wide transition-all hover:-translate-y-0.5 py-2 cursor-pointer relative group"
                            >
                            {t(l.key)}
                            <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-[#591117] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        ) : (
                            <NavLink
                            key={l.key}
                            to={l.href}
                            className={({ isActive }) =>
                                `text-[15px] font-semibold tracking-wide transition-all py-2 relative group
                                ${isActive ? 'text-[#591117]' : 'text-gray-700 hover:text-[#591117]'}`
                            }
                            >
                            {({ isActive }) => (
                                <>
                                {t(l.key)}
                                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#591117] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </>
                            )}
                            </NavLink>
                        )
                        ))}
                    </nav>
                </div>

                {/* Dirección y Estrellas */}
                <div className="hidden xl:flex flex-col items-start border-l border-gray-200 pl-6 **h-8** justify-center">
                    {/* Ajuste de h-10 a h-8 para alineación visual con header más delgado */}
                    <div className="flex gap-1 text-yellow-400 mb-0.5">
                        <IconStar className="w-3.5 h-3.5" />
                        <IconStar className="w-3.5 h-3.5" />
                        <IconStar className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <IconLocation className="w-3.5 h-3.5 text-gray-400" />
                        <span>Jr. Bolognesi 344 – Centro – Trujillo</span>
                    </div>
                </div>

                {/* Botón Auth - Botón Reservar MODERNO y MÁS PEQUEÑO */}
                <div className="flex items-center gap-4 border-l border-gray-200 pl-6 **h-8**">
                    {/* Ajuste de h-10 a h-8 para alineación visual con header más delgado */}
                    {isAuthenticated ? (
                        <div ref={userMenuRef} className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group bg-white"
                            >
                                {user?.photoUrl ? (
                                <img src={user.photoUrl} alt="Avatar" className="**w-7 h-7** rounded-full object-cover" />
                                // Avatar más pequeño (w-9 h-9 a w-7 h-7)
                                ) : (
                                <div className="**w-7 h-7** rounded-full bg-[#591117] text-white flex items-center justify-center text-xs font-bold">
                                    {/* Avatar más pequeño */}
                                    {user?.firstName?.charAt(0)?.toUpperCase()}{user?.lastName?.charAt(0)?.toUpperCase()}
                                </div>
                                )}
                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#591117] max-w-[100px] truncate hidden sm:block">
                                {user?.firstName}
                                </span>
                                <svg className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 z-50">
                                    <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                                        <p className="text-sm font-bold text-gray-900">{user?.firstName} {user?.lastName}</p>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                                    </div>
                                    <div className="p-1">
                                        <button onClick={() => { setProfileModalSection('reservations'); setProfileModalOpen(true); setUserMenuOpen(false) }} className="flex items-center w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-[#591117]/5 hover:text-[#591117] rounded-lg transition-colors">
                                            <span className="w-8"><IconBook className="w-4 h-4" /></span> Mis Reservas
                                        </button>
                                        <button onClick={() => { setProfileModalSection('profile'); setProfileModalOpen(true); setUserMenuOpen(false) }} className="flex items-center w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-[#591117]/5 hover:text-[#591117] rounded-lg transition-colors">
                                            <span className="w-8"><IconUser className="w-4 h-4" /></span> Mi Perfil
                                        </button>
                                    </div>
                                    <div className="border-t border-gray-100 my-1 mx-4"></div>
                                    <div className="p-1">
                                        <button onClick={() => { handleLogout(); setUserMenuOpen(false) }} className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <span className="w-8"><IconSignOut className="w-4 h-4" /></span> Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => openAuthModal('login')}
                                className="text-gray-600 hover:text-[#591117] text-[15px] font-medium transition-colors hidden sm:block"
                            >
                                Ingresar
                            </button>
                            <button
                                onClick={() => openAuthModal('login')} 
                                className="bg-gradient-to-r from-[#591117] to-[#7a1820] text-white text-sm px-6 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#591117]/40 hover:-translate-y-0.5 transform active:scale-95"
                            >
                                Reservar
                            </button>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== SIDEBAR / DRAWER IZQUIERDO ===== */}
      
      {/* 1. Backdrop */}
      <div 
        className={`fixed inset-0 top-20 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-500 ease-in-out ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* 2. Panel Lateral - AQUI SE QUITA LA BARRA DE SCROLL VISUALMENTE - AJUSTADO A top-16 */}
      <aside 
        className={`fixed **top-16** left-0 z-40 h-[calc(100vh-4rem)] w-full max-w-xs bg-white shadow-2xl transform transition-transform duration-500 ease-in-out lg:hidden flex flex-col overflow-y-auto ${
        // Cambiado de top-20 a top-16 y h-[calc(100vh-5rem)] a h-[calc(100vh-4rem)] para coincidir con el nuevo header de 16 unidades
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Cuerpo Sidebar - Navegación */}
        <div className="flex-1 px-4 py-6">
          
          <div className="mb-4 px-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                MENÚ
              </span>
          </div>

          <div className="mb-6">
            <button
              onClick={() => { openAuthModal('login'); setOpen(false) }} 
              className="w-full bg-gradient-to-r from-[#591117] to-[#7a1820] text-white text-lg px-5 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <IconBook className="w-5 h-5"/>
              RESERVAR AHORA
            </button>
          </div>

          <nav className="space-y-1">
            {navLinks.map((l) => {
              const NavIcon = l.icon;
              return l.href === '/info' ? (
                <button
                  key={l.key}
                  onClick={() => { setInfoModalOpen(true); setOpen(false) }}
                  className="w-full text-left py-3 px-4 rounded-xl text-base text-gray-700 hover:text-[#591117] hover:bg-[#591117]/10 transition-all font-semibold flex items-center gap-3 group"
                >
                  <NavIcon className="w-5 h-5 text-gray-500 group-hover:text-[#591117] transition-colors" />
                  {t(l.key)}
                </button>
              ) : (
                <NavLink 
                  key={l.key} 
                  to={l.href} 
                  className={({ isActive }) =>
                    `w-full flex items-center py-3 px-4 rounded-xl text-base transition-all font-semibold gap-3 ${
                      isActive ? 'text-[#591117] bg-[#591117]/10' : 'text-gray-700 hover:text-[#591117] hover:bg-[#591117]/5 group'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <NavIcon className={`w-5 h-5 ${window.location.pathname === l.href ? 'text-[#591117]' : 'text-gray-500 group-hover:text-[#591117]'} transition-colors`} />
                  {t(l.key)}
                </NavLink>
              )
            })}

            {/* Agregado info de dirección en móvil también */}
            <div className="mt-4 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
               <div className="flex gap-0.5 text-yellow-400 mb-1 justify-center">
                   <IconStar className="w-4 h-4" />
                   <IconStar className="w-4 h-4" />
                   <IconStar className="w-4 h-4" />
               </div>
               <div className="flex items-center justify-center gap-1.5 text-gray-500 text-xs text-center">
                   <IconLocation className="w-3.5 h-3.5 text-gray-400" />
                   <span>Jr. Bolognesi 344 – Centro – Trujillo</span>
               </div>
            </div>

            {/* Enlaces de perfil / autenticación */}
            {isAuthenticated ? (
              <>
                <div className="my-3 border-t border-gray-100 mx-4"></div>
                <button
                  onClick={() => { setProfileModalSection('reservations'); setProfileModalOpen(true); setOpen(false) }}
                  className="w-full text-left py-3 px-4 rounded-xl text-base text-gray-700 hover:text-[#591117] hover:bg-[#591117]/5 transition-all font-medium flex items-center gap-3 group"
                >
                  <IconBook className="w-5 h-5 text-gray-500 group-hover:text-[#591117]"/>
                  Mis Reservas
                </button>
                <button
                  onClick={() => { setProfileModalSection('profile'); setProfileModalOpen(true); setOpen(false) }}
                  className="w-full text-left py-3 px-4 rounded-xl text-base text-gray-700 hover:text-[#591117] hover:bg-[#591117]/5 transition-all font-medium flex items-center gap-3 group"
                >
                  <IconUser className="w-5 h-5 text-gray-500 group-hover:text-[#591117]"/>
                  Mi Perfil
                </button>
                <button
                  onClick={() => { handleLogout(); setOpen(false) }}
                  className="w-full text-left py-3 px-4 rounded-xl text-base text-red-600 hover:bg-red-50 transition-all font-medium flex items-center gap-3 group mt-2"
                >
                  <IconSignOut className="w-5 h-5 text-red-500 group-hover:text-red-700"/>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => { openAuthModal('login'); setOpen(false) }}
                className="w-full text-left py-3 px-4 rounded-xl text-base text-gray-700 hover:text-[#591117] hover:bg-[#591117]/5 transition-all font-medium flex items-center gap-3 group mt-2"
              >
                <IconUser className="w-5 h-5 text-gray-500 group-hover:text-[#591117]"/>
                Ingresar / Registrarse
              </button>
            )}

          </nav>
          
          <div className="my-8 border-t border-gray-100"></div>

          <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 px-2 mt-4 mb-2 border-b border-gray-100 pb-1">Configuración y Contacto</p>

          {/* Configuración */}
          <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Idioma */}
              <button 
                onClick={() => { setLang(lang === 'en' ? 'es' : 'en'); setOpen(false) }} 
                className="flex flex-col items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-600 hover:border-[#591117] hover:text-[#591117] hover:shadow-sm transition-all bg-gray-50/50"
              >
                <span className={`fi fi-${lang === 'en' ? 'us' : 'es'} text-xl`}></span>
                <span className="text-xs font-bold tracking-wider">{lang === 'en' ? 'ENGLISH' : 'ESPAÑOL'}</span>
              </button>
              
              {/* Moneda */}
              <div className="relative">
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full h-full appearance-none rounded-xl border border-gray-200 text-center bg-gray-50/50 text-gray-600 font-bold text-xs pt-7 pb-3 focus:outline-none focus:border-[#591117] hover:border-gray-300 transition-colors cursor-pointer"
                >
                  {currencies.map(c => <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}
                </select>
                <div className="pointer-events-none absolute top-2 left-0 right-0 flex items-center justify-center text-xs font-semibold text-gray-400">
                  <span>MONEDA</span>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
          </div>

          {/* Contacto */}
          <div className="space-y-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <a href="tel:+51992810971" className="flex items-center gap-4 text-gray-700 hover:text-[#591117] transition-colors group">
              <IconPhone className="w-5 h-5 text-[#6B8E23] group-hover:text-[#591117] transition-colors" />
              <span className="font-semibold text-sm">+51 992 810 971</span>
            </a>
            <a href="mailto:reservas@plazatrujillo.com" className="flex items-center gap-4 text-gray-700 hover:text-[#591117] transition-colors group">
              <IconMail className="w-5 h-5 text-[#6B8E23] group-hover:text-[#591117] transition-colors" />
              <span className="font-semibold text-sm">reservas@plazatrujillo.com</span>
            </a>
          </div>
        </div>
      </aside>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialView={authModalView} />
      <InfoModal isOpen={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} onLogout={() => { setProfileModalOpen(false); handleLogout() }} initialSection={profileModalSection} />
    </>
  )
}
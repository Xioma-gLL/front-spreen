import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

// Small inline icon components (SVG) to avoid adding react-icons as a dependency
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

const navLinks = [
  { key: 'pages.home.title', href: '/' },
  { key: 'nav.rooms', href: '/habitaciones' },
  { key: 'nav.about', href: '/quienes-somos' },
  { key: 'nav.contact', href: '/contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { lang, setLang, t } = useI18n()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur border-b" style={{ borderColor: '#E6E6E6' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://plazatrujillo.com/wp-content/uploads/2025/09/cropped-logo-plaza-trujillo-192x192.webp"
              alt="Plaza Trujillo Hotel"
              className="h-10 w-10 rounded"
            />
            <span className="font-semibold text-[#591117]">Hotel Plaza Trujillo</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
                <NavLink
                  key={l.key}
                  to={l.href}
                  className={({ isActive }) =>
                  `group text-[#591117] hover:text-[#F26A4B] relative cursor-pointer ${isActive ? 'font-semibold' : ''}`
                }
              >
                {t(l.key)}
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#F26A4B] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </NavLink>
            ))}
            
            {/* Selector de idioma */}
            <div className="flex items-center gap-3">
              {lang === 'en' ? (
                  <button type="button" aria-label={t('nav.switch_to_es')} className="inline-flex items-center gap-2 text-[#591117] hover:text-[#F26A4B]" onClick={() => setLang('es')}>
                  <span className="fi fi-es text-xl"></span>
                  <span>{t('nav.spanish')}</span>
                </button>
              ) : (
                  <button type="button" aria-label={t('nav.switch_to_en')} className="inline-flex items-center gap-2 text-[#591117] hover:text-[#F26A4B]" onClick={() => setLang('en')}>
                  <span className="fi fi-us text-xl"></span>
                  <span>{t('nav.english')}</span>
                </button>
              )}
            </div>

            {/* Menú de usuario o botones de autenticación */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {isAuthenticated ? (
                  user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <IconUserCircle className="w-8 h-8" />
                  )
                  ) : (
                    <IconUser className="w-6 h-6" />
                )}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200">
                        <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                        <div className="text-xs">{user?.email}</div>
                      </div>
                      <Link
                        to="/perfil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <IconUser className="mr-3 w-4 h-4" />
                        Mi perfil
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <IconSignOut className="mr-3 w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <IconSignIn className="mr-3 w-4 h-4" />
                        Iniciar sesión
                      </Link>
                      <Link
                        to="/registro"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <IconUserPlus className="mr-3 w-4 h-4" />
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>
          
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded border text-[#591117]"
            style={{ borderColor: '#8C0808' }}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{t('nav.open_menu')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M3.75 6.75h16.5v1.5H3.75zM3.75 11.25h16.5v1.5H3.75zM3.75 15.75h16.5v1.5H3.75z" />
            </svg>
          </button>
        </div>
      </div>
      
      {open && (
        <div className="md:hidden border-t" style={{ borderColor: '#8C0808' }}>
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">
            {navLinks.map((l) => (
              <NavLink key={l.key} to={l.href} className="block text-[#591117] cursor-pointer" onClick={() => setOpen(false)}>
                {t(l.key)}
              </NavLink>
            ))}
            
            {/* Selector de idioma móvil */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
              {lang === 'en' ? (
                <button type="button" aria-label={t('nav.switch_to_es')} className="inline-flex items-center gap-2 text-[#F2F2F2] bg-[#591117] hover:bg-[#8C0808] px-2 py-1 rounded" onClick={() => { setLang('es'); setOpen(false) }}>
                  <span className="fi fi-es text-xl"></span>
                  <span>{t('nav.spanish')}</span>
                </button>
              ) : (
                <button type="button" aria-label={t('nav.switch_to_en')} className="inline-flex items-center gap-2 text-[#F2F2F2] bg-[#591117] hover:bg-[#8C0808] px-2 py-1 rounded" onClick={() => { setLang('en'); setOpen(false) }}>
                  <span className="fi fi-us text-xl"></span>
                  <span>{t('nav.english')}</span>
                </button>
              )}
            </div>

            {/* Autenticación móvil con ícono de usuario */}
            <div className="pt-2 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200">
                    <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                    <div className="text-xs">{user?.email}</div>
                  </div>
                  <Link to="/perfil" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(false)}>
                    <IconUser className="mr-3 w-4 h-4" />
                    Mi perfil
                  </Link>
                  <button onClick={logout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <IconSignOut className="mr-3 w-4 h-4" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(false)}>
                    <IconSignIn className="mr-3 w-4 h-4" />
                    Iniciar sesión
                  </Link>
                  <Link to="/registro" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(false)}>
                    <IconUserPlus className="mr-3 w-4 h-4" />
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
    {/* Spacer to prevent content overlap with fixed header */}
    <div aria-hidden className="h-16"></div>
    </>
  )
}
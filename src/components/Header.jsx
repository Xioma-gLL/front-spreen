import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../context/LanguageContext'

const navLinks = [
  { key: 'nav.rooms', href: '/habitaciones' },
  { key: 'nav.about', href: '/quienes-somos' },
  { key: 'nav.tourism', href: '/turismo' },
  { key: 'nav.contact', href: '/contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useI18n()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://plazatrujillo.com/wp-content/uploads/2025/09/cropped-logo-plaza-trujillo-192x192.webp"
              alt="Plaza Trujillo Hotel"
              className="h-10 w-10 rounded"
            />
            <span className="font-semibold text-gray-900">Hotel Plaza Trujillo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <NavLink
                key={l.key}
                to={l.href}
                className={({ isActive }) =>
                  `group text-gray-700 hover:text-gray-900 relative ${isActive ? 'font-semibold' : ''}`
                }
              >
                {t(l.key)}
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </NavLink>
            ))}
            <div className="flex items-center gap-3">
              {lang === 'en' ? (
                <button type="button" aria-label={t('nav.switch_to_es')} className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900" onClick={() => setLang('es')}>
                  <span className="fi fi-es text-xl"></span>
                  <span>{t('nav.spanish')}</span>
                </button>
              ) : (
                <button type="button" aria-label={t('nav.switch_to_en')} className="inline-flex items-center gap-2" onClick={() => setLang('en')}>
                  <span className="fi fi-us text-xl"></span>
                  <span>{t('nav.english')}</span>
                </button>
              )}
            </div>
          </nav>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded border border-gray-300"
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
        <div className="md:hidden border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">
            {navLinks.map((l) => (
              <NavLink key={l.key} to={l.href} className="block text-gray-700" onClick={() => setOpen(false)}>
                {t(l.key)}
              </NavLink>
            ))}
            <div className="flex items-center gap-3 pt-2">
              {lang === 'en' ? (
                <button type="button" aria-label={t('nav.switch_to_es')} className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900" onClick={() => { setLang('es'); setOpen(false) }}>
                  <span className="fi fi-es text-xl"></span>
                  <span>{t('nav.spanish')}</span>
                </button>
              ) : (
                <button type="button" aria-label={t('nav.switch_to_en')} className="inline-flex items-center gap-2" onClick={() => { setLang('en'); setOpen(false) }}>
                  <span className="fi fi-us text-xl"></span>
                  <span>{t('nav.english')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../context/LanguageContext'

const navLinks = [
  { key: 'pages.home.title', href: '/' },
  { key: 'nav.rooms', href: '/habitaciones' },
  { key: 'nav.about', href: '/quienes-somos' },
  { key: 'nav.tourism', href: '/turismo' },
  { key: 'nav.contact', href: '/contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useI18n()

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur border-b" style={{ borderColor: '#E6E6E6' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
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
                  `group text-[#591117] hover:text-[#F26A4B] relative ${isActive ? 'font-semibold' : ''}`
                }
              >
                {t(l.key)}
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#F26A4B] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </NavLink>
            ))}
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
              <NavLink key={l.key} to={l.href} className="block text-[#591117]" onClick={() => setOpen(false)}>
                {t(l.key)}
              </NavLink>
            ))}
            <div className="flex items-center gap-3 pt-2">
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
          </div>
        </div>
      )}
    </header>
  )
}
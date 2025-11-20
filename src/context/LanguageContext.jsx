import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from '../i18n/strings'

const LanguageContext = createContext({ lang: 'es', setLang: () => {}, t: (k) => k })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es')

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const t = useMemo(() => {
    const dict = strings[lang] || {}
    return (key) => {
      const parts = key.split('.')
      let cur = dict
      for (const p of parts) {
        cur = cur?.[p]
      }
      return typeof cur === 'string' ? cur : key
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  return useContext(LanguageContext)
}
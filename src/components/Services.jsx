const serviceKeys = [
  'wifi',
  'parking',
  'breakfast',
  'minibar',
  'computer_room',
  'custody',
  'tourism_info',
  'printer',
  'medical',
]

function Icon({ serviceKey }) {
  const common = 'h-5 w-5'
  switch (serviceKey) {
    case 'wifi':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M2.3 9.3a12 12 0 0 1 19.4 0l-1.5 1.5a10 10 0 0 0-16.4 0L2.3 9.3Z"/><path d="M5.6 12.6a8 8 0 0 1 12.8 0l-1.5 1.5a6 6 0 0 0-9.8 0l-1.5-1.5Z"/><path d="M8.9 15.9a4 4 0 0 1 6.2 0l-1.5 1.5a2 2 0 0 0-3.2 0l-1.5-1.5Z"/></svg>
      )
    case 'parking':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M6 4h7a5 5 0 1 1 0 10H9v6H6V4Zm3 3v4h4a2 2 0 1 0 0-4H9Z"/></svg>
      )
    case 'breakfast':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M4 10h10a4 4 0 1 0 0-8H4v8Zm0 2h13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z"/></svg>
      )
    case 'minibar':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm1 3v2h2V6H7Zm0 4v2h2v-2H7Z"/></svg>
      )
    case 'computer_room':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M4 5h16v10H4V5Zm3 12h10l2 2H5l2-2Z"/></svg>
      )
    case 'custody':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 4 5 3-5 3-5-3 5-3Zm-6 5 6 3v6l-6-3v-6Zm14 6-6 3v-6l6-3v6Z"/></svg>
      )
    case 'tourism_info':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/></svg>
      )
    case 'printer':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M6 3h12v4H6V3Zm-2 6h16a2 2 0 0 1 2 2v6H18v4H6v-4H2v-6a2 2 0 0 1 2-2Zm12 10v-4H8v4h8Z"/></svg>
      )
    case 'medical':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h3v-2h-3V8h-2v3H8v2h3v3h2v-3Z"/></svg>
      )
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 14l10 5 10-5-10-5Z"/></svg>
      )
  }
}

import Reveal from './Reveal'
import { useI18n } from '../context/LanguageContext'

export default function Services() {
  const { t } = useI18n()
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900">{t('services.title')}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((s, i) => (
            <Reveal key={s} delay={i * 80}>
              <div className="flex items-center gap-3 p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 grid place-items-center rounded-full bg-indigo-50 text-indigo-700">
                  <Icon serviceKey={s} />
                </div>
                <div className="text-gray-800 font-medium">{t(`services.${s}`)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
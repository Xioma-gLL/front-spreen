import Reveal from './Reveal'
import { useI18n } from '../context/LanguageContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const [guests, setGuests] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  return (
    <section className="relative min-h-[calc(100vh-64px-80px)] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/plaza-trujillo.webp)' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br" style={{ background: 'linear-gradient(180deg, rgba(89,17,23,0.5) 0%, rgba(242,106,75,0.12) 40%, rgba(242,242,242,0.04) 100%)' }}></div>
      <div className="relative max-w-6xl mx-auto px-4 py-12 text-center">
        <Reveal>
          <h2 className="text-lg tracking-wide text-white">{t('hero.subtitle')}</h2>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-white">{t('hero.title')}</h1>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-6 mx-auto w-fit">
            <div className="relative">
              <div className="flex flex-col md:flex-row items-stretch bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="px-3 py-2 flex items-center gap-2 relative flex-1 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-gray-500 cursor-pointer"><path d="M7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 20v-1a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1H4Z"/></svg>
                  <div className="flex-1 pl-1">
                    <div className="flex gap-4 justify-center md:justify-start items-end">
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{lang === 'en' ? 'Adults' : 'Adultos'}</span>
                        <div className="flex items-center gap-1">
                          <button type="button" className="h-6 w-6 rounded border grid place-items-center cursor-pointer text-sm hover:bg-gray-100" onClick={() => setGuests((g) => Math.max(1, g - 1))}>-</button>
                          <span className="w-5 text-center text-sm font-medium text-gray-900">{guests}</span>
                          <button type="button" className="h-6 w-6 rounded border grid place-items-center cursor-pointer text-sm hover:bg-gray-100" onClick={() => setGuests((g) => g + 1)}>+</button>
                        </div>
                      </div>
                      <span className="text-gray-300 text-lg self-center">•</span>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{lang === 'en' ? 'Children' : 'Niños'}</span>
                        <div className="flex items-center gap-1">
                          <button type="button" className="h-6 w-6 rounded border grid place-items-center cursor-pointer text-sm hover:bg-gray-100" onClick={() => setChildren((c) => Math.max(0, c - 1))}>-</button>
                          <span className="w-5 text-center text-sm font-medium text-gray-900">{children}</span>
                          <button type="button" className="h-6 w-6 rounded border grid place-items-center cursor-pointer text-sm hover:bg-gray-100" onClick={() => setChildren((c) => c + 1)}>+</button>
                        </div>
                      </div>
                      <span className="text-gray-300 text-lg self-center">•</span>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{lang === 'en' ? 'Rooms' : 'Habitaciones'}</span>
                        <div className="flex items-center gap-1">
                          <button type="button" className="h-6 w-6 rounded border grid place-items-center cursor-pointer text-sm hover:bg-gray-100" onClick={() => setRooms((r) => Math.max(1, r - 1))}>-</button>
                          <span className="w-5 text-center text-sm font-medium text-gray-900">{rooms}</span>
                          <button type="button" className="h-6 w-6 rounded border grid place-items-center cursor-pointer text-sm hover:bg-gray-100" onClick={() => setRooms((r) => r + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 flex items-center gap-2 flex-1 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-gray-500 cursor-pointer"><path d="M6 3h12v4H6V3Zm-2 6h16a2 2 0 0 1 2 2v10H4V11a2 2 0 0 1 2-2Zm3 6h4v4H7v-4Zm6 0h4v4h-4v-4Z"/></svg>
                  <div className="flex-1 pl-1">
                    <div className="text-sm text-gray-500">{t('hero.search.dates_label')}</div>
                    <div className="flex gap-1 justify-center md:justify-start">
                      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent outline-none text-gray-900 text-sm px-1 w-[120px] cursor-pointer" />
                      <span className="text-gray-400 text-sm">•</span>
                      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent outline-none text-gray-900 text-sm px-1 w-[120px] cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="p-1.5 flex items-center">
                  <button type="button" className="w-full md:w-auto px-4 py-2 bg-[#F26A4B] text-white text-sm rounded-none md:rounded-none md:rounded-r-xl font-semibold hover:bg-[#F21905] cursor-pointer"
                    onClick={() => {
                      if (!checkIn || !checkOut) {
                        window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Por favor selecciona fechas', duration: 3000 } }))
                        return
                      }
                      const a = new Date(checkIn)
                      const b = new Date(checkOut)
                      if (a >= b) {
                        window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'La fecha de salida debe ser posterior a la de ingreso', duration: 4000 } }))
                        return
                      }
                      const params = new URLSearchParams({ checkIn, checkOut, guests: guests.toString(), children: children.toString(), rooms: rooms.toString() })
                      navigate(`/habitaciones?${params.toString()}`)
                    }}
                  >
                      {t('hero.search.search')}
                    </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
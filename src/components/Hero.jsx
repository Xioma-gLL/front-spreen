import Reveal from './Reveal'
import { useI18n } from '../context/LanguageContext'
import { useState } from 'react'

export default function Hero() {
  const { t, lang } = useI18n()
  const [guests, setGuests] = useState(2)
  const [rooms, setRooms] = useState(1)
  const [openGuests, setOpenGuests] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://commons.wikimedia.org/wiki/Special:FilePath/PLAZA%20DE%20ARMAS%20DE%20TRUJILLO.jpg)' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br" style={{ background: 'linear-gradient(180deg, rgba(89,17,23,0.5) 0%, rgba(242,106,75,0.12) 40%, rgba(242,242,242,0.04) 100%)' }}></div>
      <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
        <Reveal>
          <h2 className="text-lg tracking-wide text-[#F2F2F2]">{t('hero.subtitle')}</h2>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-[#F2F2F2]">{t('hero.title')}</h1>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-8 mx-auto max-w-4xl">
            <div className="relative">
              <div className="flex flex-col md:flex-row items-stretch bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="p-4 flex items-center gap-4 relative flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-500"><path d="M7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 20v-1a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1H4Z"/></svg>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-500 text-center">{t('hero.search.guests_label')}</div>
                    <button type="button" className="mt-1 text-center" onClick={() => setOpenGuests((v) => !v)}>
                      <span className="font-medium text-gray-900">{lang === 'en' ? `${guests} guests, ${rooms} room${rooms > 1 ? 's' : ''}` : `${guests} huéspedes, ${rooms} habitación${rooms > 1 ? 'es' : ''}`}</span>
                    </button>
                  </div>
                  {openGuests && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10">
                      <div className="flex items-center justify-between">
                        <div className="text-gray-700">{t('hero.search.guests_label')}</div>
                        <div className="flex items-center gap-2">
                          <button type="button" className="h-8 w-8 rounded border grid place-items-center" onClick={() => setGuests((g) => Math.max(1, g - 1))}>-</button>
                          <div className="w-6 text-center">{guests}</div>
                          <button type="button" className="h-8 w-8 rounded border grid place-items-center" onClick={() => setGuests((g) => g + 1)}>+</button>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-gray-700">{t('hero.search.rooms_label')}</div>
                        <div className="flex items-center gap-2">
                          <button type="button" className="h-8 w-8 rounded border grid place-items-center" onClick={() => setRooms((r) => Math.max(1, r - 1))}>-</button>
                          <div className="w-6 text-center">{rooms}</div>
                          <button type="button" className="h-8 w-8 rounded border grid place-items-center" onClick={() => setRooms((r) => r + 1)}>+</button>
                        </div>
                      </div>
                      <div className="mt-4 text-right">
                        <button type="button" className="px-3 py-1 rounded bg-indigo-600 text-white" onClick={() => setOpenGuests(false)}>{t('hero.search.done')}</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex items-center gap-4 flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-500"><path d="M6 3h12v4H6V3Zm-2 6h16a2 2 0 0 1 2 2v10H4V11a2 2 0 0 1 2-2Zm3 6h4v4H7v-4Zm6 0h4v4h-4v-4Z"/></svg>
                  <div className="flex-1 pl-2">
                    <div className="text-xs text-gray-500">{t('hero.search.dates_label')}</div>
                    <div className="flex gap-2 justify-center md:justify-start">
                      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent outline-none text-gray-900 px-2" />
                      <span className="text-gray-400">•</span>
                      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent outline-none text-gray-900 px-2" />
                    </div>
                  </div>
                </div>
                <div className="p-2 flex items-center">
                  <button type="button" className="w-full md:w-auto md:min-w-28 px-4 py-3 bg-[#F26A4B] text-white rounded-none md:rounded-none md:rounded-r-2xl font-semibold hover:bg-[#F21905]">
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
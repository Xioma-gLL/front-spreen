const rooms = [
  {
    key: 'single',
    desc: { es: 'Una cama individual.', en: 'One single bed.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-09-at-11.21.52-AM-1.jpg',
    price: 80,
    href: '/habitaciones',
  },
  {
    key: 'matrimonial',
    desc: { es: 'Una cama de dos plazas.', en: 'One double bed.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-16-at-2.44.35-PM.jpeg',
    price: 120,
    href: '/habitaciones',
  },
  {
    key: 'double',
    desc: { es: 'Dos camas individuales.', en: 'Two single beds.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-09-at-11.21.47-AM.jpeg',
    price: 100,
    href: '/habitaciones',
  },
]

import Reveal from './Reveal'
import { useI18n } from '../context/LanguageContext'
import { useState } from 'react'
import ReservationModal from './ReservationModal'

export default function Rooms() {
  const { t, lang } = useI18n()
  const [selected, setSelected] = useState(null)
  const [openReservation, setOpenReservation] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r, i) => (
            <Reveal key={r.key} delay={i * 100} className="group">
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow card">
                <div className="overflow-hidden">
                  <img src={r.img} alt={t(`rooms.${r.key}`)} className="h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#591117]">{t(`rooms.${r.key}`)}</h3>
                  <p className="mt-1 text-[#8C0808]">{r.desc[lang]}</p>
                  <div className="mt-2 text-sm text-[#591117] font-semibold">Precio: S/. {r.price}</div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => { setSelected({ ...r, title: t(`rooms.${r.key}`) }); setOpenDetails(true); window.dispatchEvent(new CustomEvent('closeChat')) }} className="inline-block px-4 py-2 rounded bg-[#F26A4B] text-white hover:bg-[#F21905]">{t('rooms.details')}</button>
                    <button onClick={() => { setSelected({ ...r, title: t(`rooms.${r.key}`)}); setOpenReservation(true); window.dispatchEvent(new CustomEvent('closeChat')) }} className="inline-block px-4 py-2 rounded border text-[#591117]">Reservar</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      {openDetails && selected && (
        <div className="fixed inset-0 grid place-items-center bg-black/40 p-4" style={{ zIndex: 9999 }}>
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#F2F2F2' }}>
              <div>
                <div className="text-sm text-[#591117] font-semibold">{selected.title}</div>
                <div className="text-xs text-gray-500">Precio por noche: S/. {selected.price}</div>
              </div>
              <div>
                <button className="text-gray-600 px-2 py-1" onClick={() => setOpenDetails(false)}>Cerrar</button>
              </div>
            </div>
            <div className="p-4 grid gap-4 md:grid-cols-2">
              <div>
                <img src={selected.img} alt={selected.title} className="w-full h-64 object-cover rounded" />
              </div>
              <div>
                <p className="text-gray-700 mb-4">{selected.desc[lang]}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setOpenReservation(true); setOpenDetails(false); }} className="px-4 py-2 rounded bg-[#591117] text-white">Reservar</button>
                  <button onClick={() => setOpenDetails(false)} className="px-4 py-2 rounded border">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openReservation && selected && (
        <ReservationModal room={selected} visible={openReservation} onClose={() => setOpenReservation(false)} />
      )}
    </section>
  )
}
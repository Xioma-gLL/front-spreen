import React, { useState } from 'react'
import ReservationModal from './ReservationModal'
import Reveal from './Reveal'
import { useI18n } from '../context/LanguageContext'
import roomsData from '../data/rooms'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

// Rooms data is imported from `../data/rooms` (roomsData). We don't need the example array here.


export default function Rooms({ roomsOverride = null }) {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [openDetails, setOpenDetails] = useState(false)
  const [openReservation, setOpenReservation] = useState(false)
  const [selected, setSelected] = useState(null)
  const rooms = roomsOverride || roomsData
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Room categories introduction */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {lang === 'es' ? 'Nuestras Categorías de Habitaciones' : 'Our Room Categories'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'es' 
              ? 'Disfruta de una experiencia única en nuestras habitaciones diseñadas para tu comodidad y descanso'
              : 'Enjoy a unique experience in our rooms designed for your comfort and rest'}
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.length === 0 && (
            <div className="p-8 text-center text-gray-600 col-span-full">
              {lang === 'es' ? 'No hay habitaciones disponibles para las fechas seleccionadas.' : 'No rooms available for the selected dates.'}
            </div>
          )}
          {rooms.length > 0 && rooms.map((r, i) => (
            <Reveal key={r.key} delay={i * 100} className="group">
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="overflow-hidden">
                  <img src={r.img} alt={t(`rooms.${r.key}`)} className="h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{r.title}</h3>
                  <p className="mt-1 text-gray-600">{r.desc[lang]}</p>
                  <button onClick={() => { setSelected(r); setOpenDetails(true); setOpenReservation(false); }} className="mt-4 inline-block px-4 py-2 rounded bg-[#591117] text-white hover:bg-[#8C0808] cursor-pointer">
                    {t('rooms.details')}
                  </button>
                </div>
              </div>
            </Reveal>
            ))}
        </div>
        
        {/* Additional information section */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {lang === 'es' ? 'Política de Cancelación' : 'Cancellation Policy'}
              </h3>
              <p className="text-gray-600 text-sm">
                {lang === 'es' 
                  ? 'Cancelación gratuita hasta 24 horas antes de la fecha de entrada. Consulte nuestros términos y condiciones para más detalles.'
                  : 'Free cancellation up to 24 hours before check-in date. Please check our terms and conditions for more details.'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {lang === 'es' ? 'Check-in / Check-out' : 'Check-in / Check-out'}
              </h3>
              <p className="text-gray-600 text-sm">
                {lang === 'es' 
                  ? 'Check-in: 2:00 PM - Check-out: 12:00 PM. Late check-out disponible bajo petición.'
                  : 'Check-in: 2:00 PM - Check-out: 12:00 PM. Late check-out available upon request.'}
              </p>
            </div>
          </div>
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
                <img src={selected.img} alt={t(`rooms.${selected.key}`)} className="w-full h-64 object-cover rounded" />
              </div>
              <div>
                <p className="text-gray-700 mb-4">{selected.desc[lang]}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                      if (!isAuthenticated) {
                        window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'info', message: 'Por favor inicia sesión para reservar', duration: 3500 } }))
                        navigate('/login')
                        return
                      }
                      setOpenReservation(true); setOpenDetails(false);
                    }} className="px-4 py-2 rounded bg-[#591117] text-white cursor-pointer">Reservar</button>
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
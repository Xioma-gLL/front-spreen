import { useEffect, useState } from 'react'
import { useI18n } from '../context/LanguageContext'
import BookingFormModal from './BookingFormModal'

export default function AvailableRoomsModal({ isOpen, onClose, rooms, searchParams, onSelectRoom }) {
  const { t, lang } = useI18n()
  const [selectedRooms, setSelectedRooms] = useState([])
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSelectedRooms([])
    }
  }, [isOpen])

  if (!isOpen) return null

  const totalGuests = searchParams.guests + searchParams.children
  const totalCapacity = selectedRooms.reduce((sum, room) => sum + (room.capacity || 0), 0)
  const capacityExceeded = totalCapacity < totalGuests && selectedRooms.length === searchParams.rooms

  const handleSelectRoom = (room) => {
    const isSelected = selectedRooms.find(r => r.code === room.code)
    if (isSelected) {
      setSelectedRooms(selectedRooms.filter(r => r.code !== room.code))
    } else {
      if (selectedRooms.length < searchParams.rooms) {
        setSelectedRooms([...selectedRooms, room])
      } else {
        window.dispatchEvent(new CustomEvent('toast', { 
          detail: { type: 'warning', message: `Solo puedes seleccionar ${searchParams.rooms} habitación(es)`, duration: 3000 } 
        }))
      }
    }
  }

  const handleConfirm = () => {
    if (selectedRooms.length !== searchParams.rooms) {
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { type: 'error', message: `Debes seleccionar exactamente ${searchParams.rooms} habitación(es)`, duration: 3000 } 
      }))
      return
    }
    
    // Validar capacidad total
    const finalCapacity = selectedRooms.reduce((sum, room) => sum + (room.capacity || 0), 0)
    if (finalCapacity < totalGuests) {
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { 
          type: 'error', 
          message: lang === 'en' 
            ? `Capacity exceeded! Selected rooms can accommodate ${finalCapacity} people, but you need ${totalGuests}.`
            : `¡Capacidad sobrepasada! Las habitaciones seleccionadas tienen capacidad para ${finalCapacity} personas, pero necesitas ${totalGuests}.`, 
          duration: 5000 
        } 
      }))
      return
    }
    
    // Abrir modal de formulario de reserva
    setShowBookingForm(true)
  }

  const handleCloseBookingForm = () => {
    setShowBookingForm(false)
    onClose() // También cerrar el modal de habitaciones
  }

  const totalPrice = selectedRooms.reduce((sum, room) => sum + (room.price || 0), 0)
  const nights = Math.ceil((new Date(searchParams.checkOut) - new Date(searchParams.checkIn)) / (1000 * 60 * 60 * 24))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[#F26A4B] to-[#F21905]">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{lang === 'en' ? 'Available Rooms' : 'Habitaciones Disponibles'}</h2>
            <p className="text-sm text-white/90 mt-1">
              {searchParams.checkIn} → {searchParams.checkOut} • {searchParams.guests} {lang === 'en' ? 'adults' : 'adultos'} • {searchParams.rooms} {lang === 'en' ? 'room(s)' : 'habitación(es)'}
            </p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {rooms.length === 0 ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {lang === 'en' ? 'No rooms available' : 'No hay habitaciones disponibles'}
              </h3>
              <p className="text-gray-500">
                {lang === 'en' ? 'Try different dates or fewer guests' : 'Intenta con otras fechas o menos huéspedes'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((room) => {
                const isSelected = selectedRooms.find(r => r.code === room.code)
                return (
                  <div
                    key={room.code}
                    onClick={() => handleSelectRoom(room)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg ${
                      isSelected 
                        ? 'border-[#F26A4B] bg-orange-50 shadow-md' 
                        : 'border-gray-200 hover:border-[#F26A4B]/50'
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {room.imageUrl ? (
                          <img src={room.imageUrl} alt={room.code} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{lang === 'en' ? 'Room' : 'Habitación'} {room.code}</h3>
                            <p className="text-sm text-gray-600">{room.type}</p>
                          </div>
                          {isSelected && (
                            <div className="bg-[#F26A4B] text-white rounded-full p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>{lang === 'en' ? 'Floor' : 'Piso'} {room.floor}</span>
                          </div>
                          {room.capacity && (
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span>{lang === 'en' ? 'Capacity:' : 'Capacidad:'} {room.capacity} {lang === 'en' ? 'people' : 'personas'}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-[#F26A4B]">S/ {room.price?.toFixed(2)}</span>
                          <span className="text-sm text-gray-500">/ {lang === 'en' ? 'night' : 'noche'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {rooms.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            {/* Advertencia de capacidad */}
            {capacityExceeded && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800 mb-1">
                    {lang === 'en' ? '⚠️ Capacity Exceeded' : '⚠️ Capacidad Sobrepasada'}
                  </p>
                  <p className="text-xs text-red-700">
                    {lang === 'en' 
                      ? `The selected rooms have capacity for ${totalCapacity} people, but you need accommodation for ${totalGuests} guests (${searchParams.guests} adults + ${searchParams.children} children). Please select rooms with higher capacity.`
                      : `Las habitaciones seleccionadas tienen capacidad para ${totalCapacity} personas, pero necesitas alojamiento para ${totalGuests} huéspedes (${searchParams.guests} adultos + ${searchParams.children} niños). Por favor selecciona habitaciones con mayor capacidad.`
                    }
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-600">
                <div>{lang === 'en' ? 'Selected:' : 'Seleccionadas:'} <span className="font-semibold">{selectedRooms.length} / {searchParams.rooms}</span></div>
                <div className={`text-xs mt-1 ${capacityExceeded ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                  {lang === 'en' ? 'Capacity:' : 'Capacidad:'} {totalCapacity} / {totalGuests} {lang === 'en' ? 'guests' : 'huéspedes'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{nights} {lang === 'en' ? 'nights' : 'noches'}</div>
                <div className="text-2xl font-bold text-[#F26A4B]">
                  S/ {(totalPrice * nights).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {lang === 'en' ? 'Cancel' : 'Cancelar'}
              </button>
              <button
                onClick={handleConfirm}
                disabled={selectedRooms.length !== searchParams.rooms || capacityExceeded}
                className="flex-1 px-4 py-3 bg-[#F26A4B] text-white rounded-lg font-semibold hover:bg-[#F21905] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {lang === 'en' ? 'Continue with Reservation' : 'Continuar con Reserva'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de formulario de reserva */}
      <BookingFormModal
        isOpen={showBookingForm}
        onClose={handleCloseBookingForm}
        selectedRooms={selectedRooms}
        searchParams={searchParams}
      />
    </div>
  )
}

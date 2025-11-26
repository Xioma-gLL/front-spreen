import React, { useState } from 'react'

export default function ReservationModal({ room, visible, onClose }) {
  const [name, setName] = useState('')
  const [dni, setDni] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [message, setMessage] = useState('')

  if (!visible) return null

  function handleSubmit(e) {
    e.preventDefault()
    // Basic validation
    if (!name || !dni || !checkIn || !checkOut) {
      setMessage('Por favor completa todos los campos.')
      return
    }
    const reservation = {
      room: room?.key,
      price: room?.price,
      name,
      dni,
      adults,
      children,
      checkIn,
      checkOut,
    }
    console.log('Simulated reservation', reservation)
    // Store reservation simulated in local storage
    try {
      const existing = JSON.parse(localStorage.getItem('plaza_reservations') || '[]')
      existing.push(reservation)
      localStorage.setItem('plaza_reservations', JSON.stringify(existing))
    } catch (err) {
      // ignore
    }
    setMessage('Reserva realizada con éxito (demo).')
    setTimeout(() => {
      setMessage('')
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 grid place-items-center bg-black/40 p-4" style={{ zIndex: 9999 }}>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#F2F2F2' }}>
          <div>
            <div className="text-sm text-[#591117] font-semibold">Reservar: {room?.title}</div>
            <div className="text-xs text-gray-500">Precio por noche: S/. {room?.price}</div>
          </div>
          <div>
            <button className="text-gray-600" onClick={onClose}>Cerrar</button>
          </div>
        </div>
        <form className="p-4 grid gap-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">Nombre</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">DNI</label>
              <input required value={dni} onChange={(e) => setDni(e.target.value)} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">Adultos</label>
              <input type="number" min={1} value={adults} onChange={(e) => setAdults(parseInt(e.target.value) || 1)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Niños</label>
              <input type="number" min={0} value={children} onChange={(e) => setChildren(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">Check-in</label>
              <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Check-out</label>
              <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm text-gray-800">Precio total estimado: <strong>S/. {room?.price}</strong></div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="px-4 py-2 rounded border" onClick={() => onClose()}>Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded bg-[#591117] text-white">Reservar</button>
            </div>
          </div>
          {message && <div className="text-sm text-green-600">{message}</div>}
        </form>
      </div>
    </div>
  )
}

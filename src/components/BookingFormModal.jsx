import { useState, useEffect } from 'react'
import { useI18n } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

export default function BookingFormModal({ isOpen, onClose, selectedRooms, searchParams }) {
  const { t, lang } = useI18n()
  const { user, isAuthenticated } = useAuth()

  // Calcular datos automáticos
  const totalGuests = searchParams.guests + searchParams.children
  const nights = Math.ceil((new Date(searchParams.checkOut) - new Date(searchParams.checkIn)) / (1000 * 60 * 60 * 24))
  const totalAmount = selectedRooms.reduce((sum, room) => sum + (room.price || 0), 0) * nights

  // Estado del formulario
  const [formData, setFormData] = useState({
    // Datos del cliente
    documentType: 'DNI',
    documentNumber: '',
    guestName: '',
    phone: '',
    email: '',
    address: '',
    department: '',
    province: '',
    district: '',
    
    // Datos de la reserva (autocompletados)
    channel: 'Web',
    checkIn: searchParams.checkIn,
    checkOut: searchParams.checkOut,
    numAdults: searchParams.guests,
    numChildren: searchParams.children,
    numPeople: totalGuests,
    numRooms: searchParams.rooms,
    arrivalTime: '14:00',
    departureTime: '12:00',
    paid: false,
    
    // Habitaciones seleccionadas
    rooms: selectedRooms.map(room => room.code).join(', '),
    roomType: selectedRooms[0]?.type || ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Autocompletar datos del usuario si está logueado
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        guestName: `${user.firstName} ${user.lastName}`,
        phone: user.phone || '',
        email: user.email || ''
      }))
    }
  }, [isAuthenticated, user])

  // Resetear formulario cuando se cierra
  useEffect(() => {
    if (!isOpen) {
      setErrors({})
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validaciones obligatorias
    if (!formData.documentType) newErrors.documentType = lang === 'en' ? 'Required field' : 'Este campo es obligatorio'
    if (!formData.documentNumber.trim()) newErrors.documentNumber = lang === 'en' ? 'Required field' : 'Este campo es obligatorio'
    if (!formData.guestName.trim()) newErrors.guestName = lang === 'en' ? 'Required field' : 'Este campo es obligatorio'
    if (!formData.phone.trim()) newErrors.phone = lang === 'en' ? 'Required field' : 'Este campo es obligatorio'

    // Validar formato de documento según tipo
    if (formData.documentType === 'DNI' && formData.documentNumber && formData.documentNumber.length !== 8) {
      newErrors.documentNumber = lang === 'en' ? 'DNI must be 8 digits' : 'El DNI debe tener 8 dígitos'
    }
    if (formData.documentType === 'RUC' && formData.documentNumber && formData.documentNumber.length !== 11) {
      newErrors.documentNumber = lang === 'en' ? 'RUC must be 11 digits' : 'El RUC debe tener 11 dígitos'
    }

    // Validar teléfono (mínimo 9 dígitos)
    if (formData.phone && formData.phone.length < 9) {
      newErrors.phone = lang === 'en' ? 'Phone must have at least 9 digits' : 'El teléfono debe tener al menos 9 dígitos'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { 
          type: 'error', 
          message: lang === 'en' ? 'Please fill in all required fields' : 'Por favor completa todos los campos obligatorios',
          duration: 3000 
        }
      }))
      return
    }

    setIsSubmitting(true)

    try {
      // Preparar datos para enviar al backend Spring
      const reservationData = {
        channel: formData.channel,
        guestName: formData.guestName,
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        phone: formData.phone,
        email: formData.email || (isAuthenticated && user ? user.email : ''),
        address: formData.address || '',
        department: formData.department || '',
        province: formData.province || '',
        district: formData.district || '',
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        numAdults: formData.numAdults,
        numChildren: formData.numChildren,
        numPeople: formData.numPeople,
        numRooms: formData.numRooms,
        arrivalTime: formData.arrivalTime,
        departureTime: formData.departureTime,
        totalAmount: totalAmount,
        rooms: formData.rooms,
        roomType: formData.roomType,
      }

      console.log('Enviando solicitud de reserva a Spring:', reservationData)

      // Enviar a Spring Boot (endpoint público, no requiere auth)
      const API_URL = import.meta.env.PROD 
        ? 'https://backspring-wrc6.onrender.com/api'
        : (import.meta.env.VITE_API_URL || 'http://localhost:8080/api')
      
      const response = await fetch(`${API_URL}/web-reservation-requests`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        window.dispatchEvent(new CustomEvent('toast', {
          detail: { 
            type: 'success', 
            message: lang === 'en' 
              ? 'Your reservation request has been sent successfully! We will contact you shortly.' 
              : '¡Tu solicitud de reserva ha sido enviada exitosamente! Nos pondremos en contacto contigo pronto.',
            duration: 4000 
          }
        }))
        onClose()
      } else {
        throw new Error(data.error || 'Error al crear la solicitud')
      }

    } catch (error) {
      console.error('Error creating reservation:', error)
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { 
          type: 'error', 
          message: lang === 'en' ? 'Error creating reservation' : 'Error al crear la reserva',
          duration: 3000 
        }
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[#F26A4B] to-[#F21905]">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{lang === 'en' ? 'Complete Your Reservation' : 'Completa tu Reserva'}</h2>
            <p className="text-sm text-white/90 mt-1">
              {selectedRooms.length} {lang === 'en' ? 'room(s)' : 'habitación(es)'} • S/ {totalAmount.toFixed(2)}
            </p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Datos del Cliente */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F26A4B]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {lang === 'en' ? 'Guest Information' : 'Información del Huésped'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tipo de documento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Document Type' : 'Tipo de documento'} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent ${
                      errors.documentType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="CE">Carné de Extranjería</option>
                    <option value="RUC">RUC</option>
                  </select>
                  {errors.documentType && <p className="text-xs text-red-500 mt-1">{errors.documentType}</p>}
                </div>

                {/* Número de documento */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Document Number' : 'Número'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleChange}
                    placeholder={formData.documentType === 'DNI' ? '12345678' : ''}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent ${
                      errors.documentNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.documentNumber && <p className="text-xs text-red-500 mt-1">{errors.documentNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Nombre del huésped */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Full Name' : 'Nombre completo'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    placeholder={lang === 'en' ? 'John Doe' : 'Juan Pérez'}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent ${
                      errors.guestName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.guestName && <p className="text-xs text-red-500 mt-1">{errors.guestName}</p>}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Phone' : 'Teléfono'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="987654321"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'en' ? 'Email' : 'Correo electrónico'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={lang === 'en' ? 'your@email.com' : 'tucorreo@email.com'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {lang === 'en' 
                    ? 'Optional. We will send updates about your reservation.' 
                    : 'Opcional. Te enviaremos actualizaciones sobre tu reserva.'}
                </p>
              </div>

              {/* Dirección */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'en' ? 'Address' : 'Dirección'}
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={lang === 'en' ? 'Street name and number' : 'Calle y número'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Departamento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Department' : 'Departamento'}
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="La Libertad"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                  />
                </div>

                {/* Provincia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Province' : 'Provincia'}
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="Trujillo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                  />
                </div>

                {/* Distrito */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'District' : 'Distrito'}
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Trujillo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Datos de la Reserva */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F26A4B]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                {lang === 'en' ? 'Reservation Details' : 'Detalles de la Reserva'}
              </h3>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">{lang === 'en' ? 'Check-in' : 'Entrada'}</p>
                    <p className="font-semibold text-gray-900">{formData.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{lang === 'en' ? 'Check-out' : 'Salida'}</p>
                    <p className="font-semibold text-gray-900">{formData.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{lang === 'en' ? 'Guests' : 'Huéspedes'}</p>
                    <p className="font-semibold text-gray-900">{formData.numAdults} + {formData.numChildren} = {formData.numPeople}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{lang === 'en' ? 'Rooms' : 'Habitaciones'}</p>
                    <p className="font-semibold text-gray-900">{formData.numRooms}</p>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-3">
                  <p className="text-xs text-gray-600 mb-1">{lang === 'en' ? 'Selected Rooms' : 'Habitaciones Seleccionadas'}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRooms.map(room => (
                      <span key={room.code} className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F26A4B]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        {room.code} - S/ {room.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Hora de llegada */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Arrival Time' : 'Hora de llegada'}
                  </label>
                  <input
                    type="time"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                  />
                </div>

                {/* Hora de salida */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Departure Time' : 'Hora de Salida'}
                  </label>
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Pago */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F26A4B]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                {lang === 'en' ? 'Payment' : 'Pago'}
              </h3>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{lang === 'en' ? 'Total Amount' : 'Monto Total'}</p>
                    <p className="text-3xl font-bold text-gray-900">S/ {totalAmount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedRooms.reduce((sum, room) => sum + (room.price || 0), 0).toFixed(2)} x {nights} {lang === 'en' ? 'nights' : 'noches'}
                    </p>
                  </div>
                  <div className="text-right">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white/60 rounded-lg p-3 border border-orange-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {lang === 'en' 
                      ? 'Payment will be made at the hotel upon check-in. You can pay in cash or by card.' 
                      : 'El pago se realizará en el hotel al momento del check-in. Puedes pagar en efectivo o con tarjeta.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {lang === 'en' ? 'Cancel' : 'Cancelar'}
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-[#F26A4B] text-white rounded-lg font-semibold hover:bg-[#F21905] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {lang === 'en' ? 'Creating...' : 'Creando...'}
                </>
              ) : (
                lang === 'en' ? 'Confirm Reservation' : 'Confirmar Reserva'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

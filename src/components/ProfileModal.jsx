import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'

// --- ICONOS (Sin cambios) ---
const IconCalendar = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
  </svg>
)

const IconUser = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z" />
  </svg>
)

const IconCalendarPlus = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-7-9h-2v2H8v2h2v2h2v-2h2v-2h-2v-2z" />
  </svg>
)

const IconSignOut = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
)

const IconUserCircle = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
)

const IconEmail = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

const IconPhone = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)

const IconHome = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
)

const IconEdit = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)

const IconArrowLeft = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
    </svg>
)

export default function ProfileModal({ isOpen, onClose, onLogout, initialSection = 'profile' }) {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState(initialSection)
  const [isEditing, setIsEditing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  })

  // Estado para reservas
  const [reservations, setReservations] = useState([])
  const [isLoadingReservations, setIsLoadingReservations] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || ''
      })
    }
  }, [user])

  useEffect(() => {
    if (isOpen) {
      setActiveSection(window.innerWidth < 640 ? 'menu' : initialSection)
      setIsEditing(false)
      setIsVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, initialSection])

  // Cargar reservas cuando se abre el modal y hay email
  useEffect(() => {
    const fetchReservations = async () => {
      if (!user?.email || !isOpen) {
        setIsLoadingReservations(false)
        return
      }

      setIsLoadingReservations(true)
      try {
        const API_URL = import.meta.env.PROD 
          ? 'https://backspring-wrc6.onrender.com/api'
          : (import.meta.env.VITE_API_URL || 'http://localhost:8080/api')
        
        const response = await fetch(`${API_URL}/web-reservation-requests/by-email/${user.email}`)
        const data = await response.json()
        
        if (response.ok && data.success) {
          setReservations(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching reservations:', error)
      } finally {
        setIsLoadingReservations(false)
      }
    }

    fetchReservations()
  }, [user?.email, isOpen])

  if (!isVisible) return null

  const menuItems = [
    { key: 'reservations', label: 'Mis Reservas', icon: IconCalendar },
    { key: 'profile', label: 'Mi Perfil', icon: IconUser },
  ]

  const getInitials = () => {
    const first = user?.firstName?.charAt(0)?.toUpperCase() || ''
    const last = user?.lastName?.charAt(0)?.toUpperCase() || ''
    return first + last
  }

  // --- RENDERIZADO DEL CONTENIDO ---

  const renderProfileContent = () => (
    <div className="animate-fade-in pt-2">
      {/* Cabecera de Perfil */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          {user?.photoUrl ? (
            <img src={user.photoUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover ring-2 ring-offset-2 ring-[#591117]/20" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#591117] flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {getInitials()}
            </div>
          )}
          <h3 className="text-2xl font-semibold text-gray-800">{user?.firstName} {user?.lastName}</h3>
        </div>

        {/* Botón de editar */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-[#591117] hover:bg-[#591117]/10 transition-colors cursor-pointer px-3 py-2 rounded-xl text-sm font-medium"
          >
            <IconEdit className="w-4 h-4" />
            <span>Editar Perfil</span>
          </button>
        )}
      </div>

      {/* Secciones de Datos */}
      <div className="space-y-8">
        
        {/* Sección Usuario y Nombre */}
        <section>
          <h4 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <IconUser className="w-5 h-5 text-[#591117]" />
            Información Personal
          </h4>
          <div className="space-y-4">
            
            {/* Nombre Completo */}
            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
              <IconUserCircle className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium text-gray-500">Nombre Completo</span>
                {isEditing ? (
                  <div className="flex gap-3 pt-1">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#591117] focus:border-transparent text-sm"
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#591117] focus:border-transparent text-sm"
                      placeholder="Apellido"
                    />
                  </div>
                ) : (
                  <span className="text-gray-900 font-medium pt-1">{user?.firstName} {user?.lastName}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Contacto */}
        <section>
          <h4 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <IconEmail className="w-5 h-5 text-[#591117]" />
            Datos de Contacto
          </h4>
          <div className="space-y-4">
            
            {/* Email */}
            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
              <IconEmail className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium text-gray-500">Correo Electrónico</span>
                <span className="text-gray-900 font-medium pt-1 text-sm sm:text-base break-all">{user?.email}</span>
              </div>
            </div>
            
            {/* Teléfono */}
            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
              <IconPhone className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium text-gray-500">Teléfono Móvil</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#591117] focus:border-transparent text-sm mt-1"
                    placeholder="Tu número"
                  />
                ) : (
                  <span 
                    className={user?.phone ? 'text-gray-900 font-medium pt-1' : 'text-[#591117] font-medium cursor-pointer hover:underline pt-1'}
                    onClick={() => !user?.phone && setIsEditing(true)}
                  >
                    {user?.phone || 'Agrega tu número'}
                  </span>
                )}
              </div>
            </div>

            {/* Dirección */}
            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
              <IconHome className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium text-gray-500">Dirección Principal</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#591117] focus:border-transparent text-sm mt-1"
                    placeholder="Tu dirección"
                  />
                ) : (
                  <span 
                    className={user?.address ? 'text-gray-900 font-medium pt-1' : 'text-[#591117] font-medium cursor-pointer hover:underline pt-1'}
                    onClick={() => !user?.address && setIsEditing(true)}
                  >
                    {user?.address || 'Agrega tu dirección'}
                  </span>
                )}
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Botones de Edición */}
      {isEditing && (
        <div className="flex gap-3 mt-10 pb-6">
          <button
            onClick={() => setIsEditing(false)} // Aquí iría la lógica de guardar
            className="px-6 py-2.5 bg-[#591117] text-white font-semibold rounded-xl hover:bg-[#7a171f] transition-colors cursor-pointer shadow-md shadow-[#591117]/30 text-base"
          >
            Guardar cambios
          </button>
          <button
            onClick={() => {
              setFormData({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                phone: user?.phone || '',
                address: user?.address || ''
              })
              setIsEditing(false)
            }}
            className="px-6 py-2.5 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-gray-300 text-base"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  )

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
      received: { label: 'Recibida', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      registered: { label: 'Registrada', color: 'bg-green-100 text-green-800 border-green-300' }
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const renderReservationsContent = () => {
    if (isLoadingReservations) {
      return (
        <div className="animate-fade-in pt-6 flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#591117]"></div>
        </div>
      )
    }

    if (reservations.length === 0) {
      return (
        <div className="animate-fade-in pt-6">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-gray-600 text-center flex flex-col items-center">
            <IconCalendar className="w-16 h-16 mb-6 text-gray-300" />
            <p className="text-xl font-semibold mb-4 text-gray-800">No tienes reservas activas</p>
            <p className="mb-6">¡Es el momento perfecto para planificar tu próxima visita!</p>
          </div>
        </div>
      )
    }

    return (
      <div className="animate-fade-in pt-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Mis Reservas</h3>
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{reservation.guestName}</h4>
                <p className="text-sm text-gray-500">
                  {reservation.documentType} {reservation.documentNumber}
                </p>
              </div>
              {getStatusBadge(reservation.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Check-in</p>
                <p className="text-sm font-medium text-gray-800">{formatDate(reservation.checkIn)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Check-out</p>
                <p className="text-sm font-medium text-gray-800">{formatDate(reservation.checkOut)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{reservation.numRooms} habitación(es)</span>
                <span>•</span>
                <span>{reservation.numPeople} huésped(es)</span>
              </div>
              <p className="text-lg font-bold text-[#591117]">
                S/ {reservation.totalAmount?.toFixed(2)}
              </p>
            </div>

            {reservation.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Notas</p>
                <p className="text-sm text-gray-700">{reservation.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderMobileMenu = () => (
    <div className="flex flex-col h-full animate-fade-in">
        {/* Tarjeta de Bienvenida */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-[#591117]/5 rounded-xl border border-[#591117]/10">
            {user?.photoUrl ? (
                <img src={user.photoUrl} alt="Avatar" className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md" />
            ) : (
                <div className="w-14 h-14 rounded-full bg-[#591117] flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                    {getInitials()}
                </div>
            )}
            <div>
                <p className="text-gray-500 text-sm">Bienvenido</p>
                <p className="font-bold text-gray-800 text-lg">{user?.firstName} {user?.lastName}</p>
            </div>
        </div>

        <nav className="flex-1 space-y-3">
            {menuItems.map((item) => (
                <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left bg-white hover:bg-gray-50 active:bg-gray-100 transition-all border border-gray-100 shadow-md cursor-pointer"
                >
                    <div className="p-2 rounded-full bg-[#591117]/10 text-[#591117]">
                         <item.icon className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-gray-800 text-lg">{item.label}</span>
                </button>
            ))}
        </nav>

        {/* Botón de Cerrar Sesión Móvil */}
        <div className="mt-auto pt-6 border-t border-gray-100">
            <button
                onClick={onLogout}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
                <IconSignOut className="w-6 h-6 text-red-500" />
                <span className="font-semibold text-lg">Cerrar Sesión</span>
            </button>
        </div>
    </div>
  )

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-500 ease-out ${
        isAnimating ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        className={`bg-white w-full h-full sm:h-[90vh] sm:max-h-[900px] sm:max-w-5xl sm:rounded-2xl shadow-2xl shadow-black/30 overflow-hidden flex flex-col sm:flex-row transition-all duration-500 ease-out ${
          isAnimating 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 sm:scale-95'
        }`}
      >
        {/* --- SIDEBAR ELEGANT (Desktop) --- */}
        <div className="hidden sm:flex flex-col w-72 bg-gray-50 border-r border-gray-100 h-full p-4">
          <div className="p-4 border-b border-gray-200 mb-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">MI CUENTA</h3>
            <div className="flex items-center gap-3">
              {user?.photoUrl ? (
                <img src={user.photoUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#591117] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {getInitials()}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="font-semibold text-gray-900 truncate text-base">{user?.firstName}</p>
                <p className="text-sm text-gray-500 truncate">Cliente</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  activeSection === item.key
                    ? 'bg-white text-[#591117] shadow-md ring-1 ring-gray-100'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.key ? 'text-[#591117]' : 'text-gray-400'}`} />
                <span className="font-semibold text-base">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors group cursor-pointer"
            >
              <IconSignOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              <span className="font-semibold text-base">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
          
          {/* Header Móvil y Desktop */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-5 border-b border-gray-100 min-h-[70px]">
            <div className="flex items-center gap-2">
                {/* Botón Atrás (Solo en móvil y si no estamos en el menú) */}
                {isMobile && activeSection !== 'menu' && (
                    <button
                        onClick={() => setActiveSection('menu')}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors mr-1 cursor-pointer"
                    >
                        <IconArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                )}
                
                {/* Título dinámico */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    {isMobile && activeSection === 'menu' 
                        ? 'Menú Principal' 
                        : menuItems.find(i => i.key === activeSection)?.label || 'Perfil'
                    }
                </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer bg-gray-50 sm:bg-transparent"
            >
              <IoClose className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Área Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
            {isMobile && activeSection === 'menu' ? (
                // Vista Menú Móvil
                renderMobileMenu()
            ) : (
                // Vistas de Contenido (Perfil, Reservas, etc)
                <>
                    {activeSection === 'profile' && renderProfileContent()}
                    {activeSection === 'reservations' && renderReservationsContent()}
                    {activeSection === 'newReservation' && renderNewReservationContent()}
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
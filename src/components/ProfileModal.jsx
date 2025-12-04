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
  
  // Estado para detectar si es móvil (para lógica de navegación)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  })

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
      // En móvil, siempre empezamos en el menú principal ('menu') para evitar confusión
      // En escritorio, usamos la sección inicial
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

  if (!isVisible) return null

  const menuItems = [
    { key: 'reservations', label: 'Mis Reservas', icon: IconCalendar },
    { key: 'profile', label: 'Mi perfil', icon: IconUser },
    { key: 'newReservation', label: 'Nueva reserva', icon: IconCalendarPlus },
  ]

  const getInitials = () => {
    const first = user?.firstName?.charAt(0)?.toUpperCase() || ''
    const last = user?.lastName?.charAt(0)?.toUpperCase() || ''
    return first + last
  }

  // --- RENDERIZADO DEL CONTENIDO ---

  const renderProfileContent = () => (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Mi perfil</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-[#591117] hover:text-[#7a171f] transition-colors cursor-pointer"
          >
            <IconEdit className="w-4 h-4" />
            <span>Editar</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 mb-8">
        {user?.photoUrl ? (
          <img src={user.photoUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#591117] flex items-center justify-center text-white font-bold text-xl">
            {getInitials()}
          </div>
        )}
        <h3 className="text-xl font-medium text-gray-800">{user?.firstName} {user?.lastName}</h3>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-3 pb-2 border-b border-gray-200">Usuario</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <IconUserCircle className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 w-24">Usuario</span>
            <span className="text-gray-800"></span>
          </div>
          <div className="flex items-center gap-3">
            <IconUser className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 w-24">Nombre</span>
            {isEditing ? (
              <div className="flex gap-2 flex-1">
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
              <span className="text-gray-800">{user?.firstName} {user?.lastName}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-3 pb-2 border-b border-gray-200">Contactos</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <IconEmail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 w-24">Email</span>
            <span className="text-gray-800 text-sm sm:text-base break-all">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <IconPhone className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 w-24">Tlf. Móvil</span>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#591117] focus:border-transparent text-sm"
                placeholder="Tu número"
              />
            ) : (
              <span 
                className={user?.phone ? 'text-gray-800' : 'text-[#591117] cursor-pointer hover:underline'}
                onClick={() => !user?.phone && setIsEditing(true)}
              >
                {user?.phone || 'Agrega tu número'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <IconHome className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 w-24">Dirección</span>
            {isEditing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#591117] focus:border-transparent text-sm"
                placeholder="Tu dirección"
              />
            ) : (
              <span 
                className={user?.address ? 'text-gray-800' : 'text-[#591117] cursor-pointer hover:underline'}
                onClick={() => !user?.address && setIsEditing(true)}
              >
                {user?.address || 'Agrega tu dirección'}
              </span>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-[#591117] text-white rounded-lg hover:bg-[#7a171f] transition-colors cursor-pointer text-sm"
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
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-sm"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  )

  const renderReservationsContent = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Reservas</h2>
      <div className="text-gray-500 text-center py-12 flex flex-col items-center">
        <IconCalendar className="w-16 h-16 mb-4 text-gray-300" />
        <p>No tienes reservas activas</p>
        <button 
          onClick={() => setActiveSection('newReservation')}
          className="mt-4 px-4 py-2 bg-[#591117] text-white rounded-lg hover:bg-[#7a171f] transition-colors cursor-pointer"
        >
          Hacer una reserva
        </button>
      </div>
    </div>
  )

  const renderNewReservationContent = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Nueva reserva</h2>
      <div className="text-gray-500 text-center py-12 flex flex-col items-center">
        <IconCalendarPlus className="w-16 h-16 mb-4 text-gray-300" />
        <p>Selecciona las fechas y habitación deseada</p>
        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#591117] text-white rounded-lg hover:bg-[#7a171f] transition-colors cursor-pointer"
        >
          Ver habitaciones
        </button>
      </div>
    </div>
  )
  
  // Menú exclusivo para vista móvil
  const renderMobileMenu = () => (
    <div className="flex flex-col h-full animate-fade-in">
        <div className="flex items-center gap-4 mb-8 p-2">
            {user?.photoUrl ? (
                <img src={user.photoUrl} alt="Avatar" className="w-14 h-14 rounded-full object-cover" />
            ) : (
                <div className="w-14 h-14 rounded-full bg-[#591117] flex items-center justify-center text-white font-semibold text-lg">
                    {getInitials()}
                </div>
            )}
            <div>
                <p className="text-gray-500 text-sm">Bienvenido</p>
                <p className="font-semibold text-gray-800 text-lg">{user?.firstName} {user?.lastName}</p>
            </div>
        </div>

        <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
                <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors border border-gray-100 shadow-sm"
                >
                    <div className="bg-white p-2 rounded-full shadow-sm text-[#591117]">
                         <item.icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-gray-700 text-lg">{item.label}</span>
                </button>
            ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
            <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
            >
                <IconSignOut className="w-6 h-6" />
                <span className="font-medium text-lg">Cerrar sesión</span>
            </button>
        </div>
    </div>
  )

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ease-out ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* 
         CONTENEDOR PRINCIPAL 
         - Móvil: w-full h-full (pantalla completa), sin bordes redondeados.
         - Desktop: max-w-4xl, bordes redondeados, altura automática.
      */}
      <div 
        className={`bg-white w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row transition-all duration-300 ease-out ${
          isAnimating 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 sm:scale-95'
        }`}
      >
        {/* --- SIDEBAR (Solo visible en Desktop 'sm:flex') --- */}
        <div className="hidden sm:flex flex-col w-64 bg-gray-50 border-r border-gray-200 h-full">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Área personal</h3>
            <div className="flex items-center gap-3">
              {user?.photoUrl ? (
                <img src={user.photoUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#591117] flex items-center justify-center text-white font-bold">
                  {getInitials()}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="font-medium text-gray-900 truncate text-sm">{user?.firstName}</p>
                <p className="text-xs text-gray-500 truncate">Cliente</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  activeSection === item.key
                    ? 'bg-white text-[#591117] shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.key ? 'text-[#591117]' : 'text-gray-400'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors group"
            >
              <IconSignOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              <span className="font-medium text-sm">Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
          
          {/* Header Móvil y Desktop */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 min-h-[60px]">
            <div className="flex items-center gap-2">
                {/* Botón Atrás (Solo en móvil y si no estamos en el menú) */}
                {isMobile && activeSection !== 'menu' && (
                    <button
                        onClick={() => setActiveSection('menu')}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors mr-1"
                    >
                        <IconArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                )}
                
                {/* Título dinámico */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    {isMobile && activeSection === 'menu' 
                        ? 'Área Personal' 
                        : menuItems.find(i => i.key === activeSection)?.label || 'Perfil'
                    }
                </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer bg-gray-50 sm:bg-transparent"
            >
              <IoClose className="w-6 h-6 text-gray-500" />
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
import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'

// Iconos SVG inline
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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  })

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
      setActiveSection(initialSection)
      setIsEditing(false)
    }
  }, [isOpen, initialSection])

  // Manejar animación de entrada/salida
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen])

  if (!isVisible) return null

  const handleBackdropClick = (e) => {
    // Permite cerrar solo si el modal no ocupa toda la pantalla (o sea, si no es móvil)
    if (e.target === e.currentTarget && window.innerWidth >= 640) {
      onClose()
    }
  }

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

  const renderProfileContent = () => (
    <div>
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

      {/* Avatar y nombre */}
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

      {/* Sección Usuario */}
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

      {/* Sección Contactos */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-3 pb-2 border-b border-gray-200">Contactos</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <IconEmail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 w-24">Email</span>
            <span className="text-gray-800">{user?.email}</span>
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
                placeholder="Tu número de teléfono"
              />
            ) : (
              <span 
                className={user?.phone ? 'text-gray-800' : 'text-[#591117] cursor-pointer hover:underline'}
                onClick={() => !user?.phone && setIsEditing(true)}
              >
                {user?.phone || 'Agrega tu número de teléfono'}
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

      {/* Botones de edición */}
      {isEditing && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              // Aquí guardarías los cambios
              setIsEditing(false)
            }}
            className="px-4 py-2 bg-[#591117] text-white rounded-lg hover:bg-[#7a171f] transition-colors cursor-pointer"
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
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  )

  const renderReservationsContent = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Reservas</h2>
      <div className="text-gray-500 text-center py-12">
        <IconCalendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
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
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Nueva reserva</h2>
      <div className="text-gray-500 text-center py-12">
        <IconCalendarPlus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
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
  
  // Renderiza el menú principal en móvil, ya que el sidebar estará oculto
  const renderMobileMenu = () => (
    <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">Área personal</h2>
        {/* Header de bienvenida móvil */}
        <div className="flex items-center gap-3 mb-6">
            {user?.photoUrl ? (
                <img src={user.photoUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            ) : (
                <div className="w-10 h-10 rounded-full bg-[#591117] flex items-center justify-center text-white font-semibold">
                    {getInitials()}
                </div>
            )}
            <div>
                <p className="font-medium text-gray-800 text-base">Hola {user?.firstName} {user?.lastName}</p>
            </div>
        </div>

        {/* Menú de navegación móvil */}
        <nav className="flex flex-col space-y-2 mb-6">
            {menuItems.map((item) => (
                <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
                        activeSection === item.key
                            ? 'bg-[#591117]/10 text-[#591117] font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                </button>
            ))}
        </nav>

        {/* Cerrar sesión móvil */}
        <div className="p-2 border-t border-gray-200">
            <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
                <IconSignOut className="w-5 h-5" />
                <span className="font-medium">Cerrar sesión</span>
            </button>
        </div>
    </div>
  )


  return (
    <div
      // Ajuste para móvil: alinear al inicio (arriba) y quitar padding, usar p-4 en sm/desktop
      className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ease-out ${
        isAnimating ? 'bg-black/50' : 'bg-black/0'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        // Ajuste para móvil: ocupar h-full y w-full sin redondeos. En sm/desktop, usar max-w-3xl y redondeos.
        className={`bg-white shadow-2xl w-full max-w-3xl h-full sm:h-auto max-h-full sm:max-h-[90vh] overflow-hidden flex transition-all duration-300 ease-out ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0 sm:rounded-2xl' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Sidebar izquierdo - Ocultar en móvil (hidden sm:flex) */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex-col hidden sm:flex">
          {/* Header del sidebar */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Área personal</h3>
            <div className="flex items-center gap-3">
              {user?.photoUrl ? (
                <img src={user.photoUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#591117] flex items-center justify-center text-white font-semibold">
                  {getInitials()}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-800 text-sm">Hola {user?.firstName} {user?.lastName}</p>
              </div>
            </div>
          </div>

          {/* Menú de navegación */}
          <nav className="flex-1 p-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
                  activeSection === item.key
                    ? 'bg-[#591117]/10 text-[#591117]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Cerrar sesión */}
          <div className="p-2 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
              <IconSignOut className="w-5 h-5" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col w-full"> {/* Asegura que ocupe el ancho completo en móvil */}
          
            {/* Header con botón cerrar y navegación móvil */}
          <div className="flex justify-between p-4 border-b border-gray-100">
                {/* Botón de retroceso en móvil (sm:hidden) */}
                {activeSection !== 'menu' && window.innerWidth < 640 && (
                    <button
                        onClick={() => setActiveSection('menu')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer sm:hidden"
                    >
                        <IconArrowLeft className="w-6 h-6 text-gray-500" />
                    </button>
                )}
                {/* Título en móvil cuando no está en el menú principal */}
                <h3 className="text-xl font-semibold text-gray-800 sm:hidden">
                    {activeSection !== 'menu' && menuItems.find(item => item.key === activeSection)?.label}
                </h3>

                {/* Este div mantiene el espacio si no hay botón de retroceso */}
                {activeSection === 'menu' && window.innerWidth < 640 && <div className="w-6 h-6"></div>}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <IoClose className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Contenido */}
            {/* En móvil (pantallas < sm), si la sección activa no es 'profile', muestra el menú primero */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-6">
                {window.innerWidth < 640 && activeSection !== 'profile' && activeSection !== 'reservations' && activeSection !== 'newReservation' && renderMobileMenu()}
                
                {/* Usa 'menu' como sección inicial para móvil si el sidebar está oculto */}
                {window.innerWidth < 640 && activeSection === 'menu' && renderMobileMenu()}
                
                {/* Contenido en escritorio o si la sección ya fue seleccionada en móvil */}
                {activeSection === 'profile' && renderProfileContent()}
                {activeSection === 'reservations' && renderReservationsContent()}
                {activeSection === 'newReservation' && renderNewReservationContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
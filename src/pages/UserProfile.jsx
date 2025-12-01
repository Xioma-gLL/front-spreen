import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import roomsData from '../data/rooms'

// small inline svg icons
const IconCamera = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 5a7 7 0 100 14 7 7 0 000-14zM4 7h2l1-2h6l1 2h2v11H4V7z"/></svg>
)
const IconEdit = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
)
const IconSave = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H5a2 2 0 00-2 2v14l4-4h10a2 2 0 002-2V5a2 2 0 00-2-2z"/></svg>
)
const IconTimes = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 10-1.41 1.41L10.59 12l-4.9 4.89a1 1 0 101.41 1.42L12 13.41l4.89 4.9a1 1 0 001.42-1.41L13.41 12l4.9-4.89a1 1 0 000-1.4z"/></svg>
)

export default function UserProfile() {
  const { user, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  })
  const [reservations, setReservations] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || ''
    })
    setIsEditing(false)
  }

  useEffect(() => {
    // load reservations from localStorage and ensure each has an id
    try {
      const raw = JSON.parse(localStorage.getItem('plaza_reservations') || '[]')
      const normalized = raw.map((r, i) => ({ ...r, id: r.id || `${r.room}-${r.checkIn}-${r.checkOut}-${i}` }))
      setReservations(normalized)
      // store normalized list back so we have stable ids
      localStorage.setItem('plaza_reservations', JSON.stringify(normalized))
    } catch (err) {
      setReservations([])
    }
  }, [])

  useEffect(() => {
    document.title = `Perfil - Hotel Plaza Trujillo`
  }, [])

  useEffect(() => {
    // expose count to stats area if needed or other side-effects
  }, [reservations])

  const handleCancelReservation = (id) => {
    if (!confirm('¿Desea cancelar esta reserva?')) return
    const filtered = reservations.filter((r) => r.id !== id)
    setReservations(filtered)
    localStorage.setItem('plaza_reservations', JSON.stringify(filtered))
  }

  const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString() } catch { return d }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#FFF5F5] py-12 px-4">
      <Header />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-32" style={{ background: 'linear-gradient(90deg, var(--color-maroon) 0%, var(--color-salmon) 100%)' }}></div>
          <div className="relative px-8 pb-8">
            <div className="flex items-end -mt-16">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 rounded-full text-white" style={{ background: 'var(--color-maroon)' }}>
                  <IconCamera />
                </button>
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>

              
              </div>
          </div>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información personal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Información personal
                </h2>
                {!isEditing && (
                    <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 text-white rounded-lg"
                    style={{ background: 'linear-gradient(90deg, var(--color-maroon) 0%, var(--color-salmon) 100%)' }}
                  >
                      <IconEdit className="mr-2" />
                    Editar
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biografía
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26A4B] focus:border-transparent"
                      placeholder="Cuéntanos un poco sobre ti..."
                    />
                  </div>
                  <div className="flex space-x-3">
                      <button
                      type="submit"
                      className="flex items-center px-4 py-2 text-white rounded-lg"
                      style={{ background: 'var(--color-maroon)' }}
                    >
                      <IconSave className="mr-2" />
                      Guardar
                    </button>
                      <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 text-white rounded-lg"
                      style={{ background: 'var(--color-deep)' }}
                      >
                      <IconTimes className="mr-2" />
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nombre completo</h3>
                    <p className="text-gray-900">{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                    <p className="text-gray-900">{user?.phone || 'No especificado'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Biografía</h3>
                    <p className="text-gray-900">{user?.bio || 'Sin biografía'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Historial de Reservas (se muestra debajo de Información personal) */}
            <div className="mt-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Historial de Reservas</h3>
                  <div className="text-sm text-gray-500">{reservations.length} reserva(s)</div>
                </div>
                {reservations.length === 0 ? (
                  <div className="text-sm text-gray-600">No tienes reservas registradas.</div>
                ) : (
                  <div className="space-y-3">
                    {reservations.map((r) => {
                      const room = roomsData.find((x) => x.key === r.room) || {}
                      const days = Math.max(1, Math.round((new Date(r.checkOut) - new Date(r.checkIn)) / (1000 * 60 * 60 * 24)))
                      const total = (r.price || room.price || 0) * days
                      return (
                        <div key={r.id || `${r.room}-${r.checkIn}`} className="p-3 border rounded-lg flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <img src={room.img || 'https://source.unsplash.com/80x80/?hotel-room'} alt={room.title || r.room} className="w-20 h-16 object-cover rounded" />
                            <div>
                              <div className="font-medium text-gray-900">{room.title || r.room}</div>
                              <div className="text-sm text-gray-500">{formatDate(r.checkIn)} — {formatDate(r.checkOut)} · {r.adults || 1} adulto(s){r.children ? ` · ${r.children} niño(s)` : ''}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Total</div>
                              <div className="font-semibold text-gray-900">S/. {total}</div>
                            </div>
                            <button onClick={() => handleCancelReservation(r.id)} className="px-3 py-2 rounded bg-[#F26A4B] text-white">Cancelar</button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Estadísticas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reservas</span>
                  <span className="font-semibold">{reservations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Favoritos</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reseñas</span>
                  <span className="font-semibold">5</span>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  Cambiar contraseña
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  Configuración de privacidad
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  Notificaciones
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  style={{ borderColor: 'var(--color-deep)' }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
import Header from '../components/Header'
import Rooms from '../components/Rooms'
import roomsData from '../data/rooms'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import { useI18n } from '../context/LanguageContext'
import { useEffect } from 'react'
// inline icons to avoid installing react-icons
const IconAward = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.09 4.26L18.8 7l-3.7 2.74.88 5.12L12 13.77 8.99 14.86l.88-5.12L6.17 7l4.71-.74L12 2z" />
  </svg>
)
const IconMap = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 11 7 11s7-5.7 7-11c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
  </svg>
)
const IconDollar = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1v2a4 4 0 010 8v2a4 4 0 010 8v2c-5 0-9-2-9-6 0-3.5 3.6-5.4 8-5.9V9a4 4 0 010-8V1c5 0 9 2 9 6 0 3.5-3.6 5.4-8 5.9V13c1 0 2-.5 2-1.5h2c0 1-1 3-4 3v2a4 4 0 010 8v2c-5 0-9-2-9-6 0-3.5 3.6-5.4 8-5.9V9a4 4 0 010-8V1z" />
  </svg>
)
const IconWifi = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4.2-2.2c.6.6.6 1.6 0 2.2-.6.6-1.6.6-2.2 0C13.8 17.6 12.9 17.4 12 17.4s-1.8.2-2.9.6c-.6.3-1.5.2-2.1-.4-.6-.6-.7-1.5-.4-2.2.7-1.8 2.4-3.2 4.4-3.9.7-.2 1.5 0 2.1.4.6.4 1.3 1 2.1 1.4zM4.2 8.8C7.1 6 10.4 4 14 3.2c.8-.2 1.6.4 1.6 1.3 0 1.9 0 1.9 1.6 2.6 0 0-6.3 1-12 3.2z" />
  </svg>
)
const IconSnowflake = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l1 3 2-1-2 2 3 1-3 1 2 2-2-1-1 3-1-3-2 1 2-2-3-1 3-1-2-2 2 1 1-3z" />
  </svg>
)
const IconCoffee = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 3H6a2 2 0 00-2 2v6a5 5 0 005 5h4a5 5 0 005-5V8a5 5 0 00-5-5h1V3zM6 21h10v-2H6v2z" />
  </svg>
)
const IconCar = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 11l2-4h10l2 4v6h-1a1 1 0 01-1 1v1H6v-1a1 1 0 01-1-1H4v-6zM7 17a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
)

export default function RoomsPage() {
  const { t, lang } = useI18n()
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    document.title = `${t('pages.rooms.title')} - Hotel Plaza Trujillo`
  }, [t])
  
  // parse query params for search
  const params = new URLSearchParams(location.search)
  const checkIn = params.get('checkIn')
  const checkOut = params.get('checkOut')
  const guests = parseInt(params.get('guests') || '0', 10)

  // function to check availability using local storage reservations
  function roomAvailable(room) {
    if (!checkIn || !checkOut) return true
    try {
      const reservations = JSON.parse(localStorage.getItem('plaza_reservations') || '[]')
      const aStart = new Date(checkIn)
      const aEnd = new Date(checkOut)
      for (const r of reservations) {
        if (r.room === room.key) {
          const bStart = new Date(r.checkIn)
          const bEnd = new Date(r.checkOut)
          // overlap if aStart < bEnd && aEnd > bStart
          if (aStart < bEnd && aEnd > bStart) return false
        }
      }
    } catch (err) {
      // ignore
    }
    return true
  }

  // filter by capacity and availability
  const availableRooms = roomsData.filter((r) => {
    if (guests && r.capacity < guests) return false
    return roomAvailable(r)
  })
  // If no dates are provided, we still want to apply the guests capacity filter
  const filteredByCapacity = roomsData.filter((r) => (guests ? r.capacity >= guests : true))
  
  // limit rooms to maximum 15 as this hotel has only 15 rooms
  const MAX_ROOMS = 15
  const availableRoomsLimited = availableRooms.slice(0, MAX_ROOMS)
  const filteredByCapacityLimited = filteredByCapacity.slice(0, MAX_ROOMS)

  const totalFilteredCount = (checkIn && checkOut) ? availableRooms.length : filteredByCapacity.length
  const displayedCount = Math.min(totalFilteredCount, MAX_ROOMS)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Enhanced header section */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('pages.rooms.title')}</h1>
            <p className="text-lg text-gray-700 mb-6">{t('pages.rooms.subtitle')}</p>
            <div className="bg-indigo-50 rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                {lang === 'es' ? '¿Por qué elegir nuestras habitaciones?' : 'Why choose our rooms?'}
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center flex flex-col items-center">
                  <div className="text-2xl mb-2 text-indigo-600 flex justify-center">
                    <IconAward />
                  </div>
                  <p className="text-indigo-800">
                    {lang === 'es' ? 'Calidad Superior' : 'Superior Quality'}
                  </p>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="text-2xl mb-2 text-indigo-600 flex justify-center">
                    <IconMap />
                  </div>
                  <p className="text-indigo-800">
                    {lang === 'es' ? 'Ubicación Privilegiada' : 'Prime Location'}
                  </p>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="text-2xl mb-2 text-indigo-600 flex justify-center">
                    <IconDollar />
                  </div>
                  <p className="text-indigo-800">
                    {lang === 'es' ? 'Mejor Precio' : 'Best Price'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Room features overview */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'es' ? 'Comodidades en todas nuestras habitaciones' : 'Amenities in all our rooms'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                  <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
                  <IconWifi />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">WiFi Gratis</h4>
                <p className="text-sm text-gray-600">
                  {lang === 'es' ? 'Internet de alta velocidad' : 'High speed internet'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
                  <IconSnowflake />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Minibar</h4>
                <p className="text-sm text-gray-600">
                  {lang === 'es' ? 'Bebidas y snacks' : 'Drinks and snacks'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
                  <IconCoffee />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Desayuno</h4>
                <p className="text-sm text-gray-600">
                  {lang === 'es' ? 'Desayuno continental' : 'Continental breakfast'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
                  <IconCar />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Estacionamiento</h4>
                <p className="text-sm text-gray-600">
                  {lang === 'es' ? 'Parqueo seguro' : 'Safe parking'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4 text-sm">
            {checkIn && checkOut ? (
              `${displayedCount} habitaciones disponibles de ${totalFilteredCount} para ${guests || 'cualquier número de'} huéspedes entre ${checkIn} y ${checkOut}`
            ) : (
              `${displayedCount} habitaciones mostradas de ${totalFilteredCount} (máx. ${MAX_ROOMS})${guests ? ` para ${guests} huésped(es)` : ''}`
            )}
          </div>
        </div>
        {/* If searching by dates we override the rooms to available ones only; otherwise, show all rooms (still limited to MAX_ROOMS). */}
        <Rooms roomsOverride={checkIn && checkOut ? availableRoomsLimited : filteredByCapacityLimited} />
      </main>
      <Footer />
    </div>
  )
}
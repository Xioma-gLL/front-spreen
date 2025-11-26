const rooms = [
  {
    key: 'single',
    desc: { es: 'Una cama individual.', en: 'One single bed.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-09-at-11.21.52-AM-1.jpg',
    href: 'https://plazatrujillo.com/habitaciones/',
    price: { es: 'Desde $35 USD', en: 'From $35 USD' },
    amenities: ['wifi', 'minibar', 'breakfast'],
    size: { es: '15 m²', en: '15 m²' },
    capacity: { es: '1 persona', en: '1 person' },
  },
  {
    key: 'matrimonial',
    desc: { es: 'Una cama de dos plazas.', en: 'One double bed.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-16-at-2.44.35-PM.jpeg',
    href: 'https://plazatrujillo.com/habitaciones/',
    price: { es: 'Desde $45 USD', en: 'From $45 USD' },
    amenities: ['wifi', 'minibar', 'breakfast', 'parking'],
    size: { es: '20 m²', en: '20 m²' },
    capacity: { es: '2 personas', en: '2 people' },
  },
  {
    key: 'double',
    desc: { es: 'Dos camas individuales.', en: 'Two single beds.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-09-at-11.21.47-AM.jpeg',
    href: 'https://plazatrujillo.com/habitaciones/',
    price: { es: 'Desde $50 USD', en: 'From $50 USD' },
    amenities: ['wifi', 'minibar', 'breakfast', 'parking'],
    size: { es: '22 m²', en: '22 m²' },
    capacity: { es: '2 personas', en: '2 people' },
  },
  {
    key: 'triple',
    desc: { es: 'Tres camas individuales.', en: 'Three single beds.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/room-placeholder.jpg',
    href: 'https://plazatrujillo.com/habitaciones/',
    price: { es: 'Desde $65 USD', en: 'From $65 USD' },
    amenities: ['wifi', 'minibar', 'breakfast', 'parking'],
    size: { es: '28 m²', en: '28 m²' },
    capacity: { es: '3 personas', en: '3 people' },
  },
  {
    key: 'suite',
    desc: { es: 'Suite ejecutiva con sala de estar.', en: 'Executive suite with living room.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/suite-placeholder.jpg',
    href: 'https://plazatrujillo.com/habitaciones/',
    price: { es: 'Desde $85 USD', en: 'From $85 USD' },
    amenities: ['wifi', 'minibar', 'breakfast', 'parking', 'room_service'],
    size: { es: '40 m²', en: '40 m²' },
    capacity: { es: '2 personas', en: '2 people' },
  },
  {
    key: 'family',
    desc: { es: 'Habitación familiar con cocina.', en: 'Family room with kitchen.' },
    img: 'http://plazatrujillo.com/wp-content/uploads/2025/09/family-room-placeholder.jpg',
    href: 'https://plazatrujillo.com/habitaciones/',
    price: { es: 'Desde $75 USD', en: 'From $75 USD' },
    amenities: ['wifi', 'minibar', 'breakfast', 'parking', 'kitchen'],
    size: { es: '35 m²', en: '35 m²' },
    capacity: { es: '4 personas', en: '4 people' },
  },
]

import Reveal from './Reveal'
import { useI18n } from '../context/LanguageContext'
import { 
  FaWifi, 
  FaSnowflake, 
  FaCoffee, 
  FaCar, 
  FaUtensils, 
  FaUsers,
  FaHome
} from 'react-icons/fa'

const amenityIcons = {
  wifi: FaWifi,
  minibar: FaSnowflake,
  breakfast: FaCoffee,
  parking: FaCar,
  room_service: FaUtensils,
  kitchen: FaHome,
}

export default function Rooms() {
  const { t, lang } = useI18n()
  
  const handleBooking = (roomKey) => {
    // Simple booking action - could be expanded to integrate with booking system
    alert(`Redirigiendo a reservas para ${t(`rooms.${roomKey}`)}...`)
  }
  
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
          {rooms.map((r, i) => (
            <Reveal key={r.key} delay={i * 100} className="group">
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="overflow-hidden relative">
                  <img 
                    src={r.img} 
                    alt={t(`rooms.${r.key}`)} 
                    className="h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-indigo-600">{r.price[lang]}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{t(`rooms.${r.key}`)}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {r.size[lang]}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{r.desc[lang]}</p>
                  
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center justify-center">
                      <FaUsers className="mr-1 flex-shrink-0" size={16} />
                      {r.capacity[lang]}
                    </span>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      {lang === 'es' ? 'Servicios incluidos:' : 'Included services:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {r.amenities.map((amenity) => {
                        const IconComponent = amenityIcons[amenity]
                        return (
                          <span 
                            key={amenity}
                            className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs bg-indigo-50 text-indigo-700"
                            title={t(`services.${amenity}`)}
                          >
                            {IconComponent && <IconComponent className="mr-1 flex-shrink-0" size={12} />}
                            {t(`services.${amenity}`)}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={r.href} 
                      className="flex-1 inline-block px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-center text-sm font-medium"
                    >
                      {t('rooms.details')}
                    </a>
                    <button 
                      onClick={() => handleBooking(r.key)}
                      className="flex-1 inline-block px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      {lang === 'es' ? 'Reservar' : 'Book Now'}
                    </button>
                  </div>
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
    </section>
  )
}
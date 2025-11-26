import Header from '../components/Header'
import Rooms from '../components/Rooms'
import Footer from '../components/Footer'
import { useI18n } from '../context/LanguageContext'
import { useEffect } from 'react'
import { 
  FaAward, 
  FaMapMarkerAlt, 
  FaDollarSign,
  FaWifi,
  FaSnowflake,
  FaCoffee,
  FaCar
} from 'react-icons/fa'

export default function RoomsPage() {
  const { t, lang } = useI18n()
  useEffect(() => {
    document.title = `${t('pages.rooms.title')} - Hotel Plaza Trujillo`
  }, [t])
  
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
                    <FaAward size={24} />
                  </div>
                  <p className="text-indigo-800">
                    {lang === 'es' ? 'Calidad Superior' : 'Superior Quality'}
                  </p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="text-2xl mb-2 text-indigo-600 flex justify-center">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <p className="text-indigo-800">
                    {lang === 'es' ? 'Ubicación Privilegiada' : 'Prime Location'}
                  </p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="text-2xl mb-2 text-indigo-600 flex justify-center">
                    <FaDollarSign size={24} />
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
                  <FaWifi />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">WiFi Gratis</h4>
                <p className="text-sm text-gray-600">
                  {lang === 'es' ? 'Internet de alta velocidad' : 'High speed internet'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
                  <FaSnowflake />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Minibar</h4>
                <p className="text-sm text-gray-600">
                  {lang === 'es' ? 'Bebidas y snacks' : 'Drinks and snacks'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
                  <FaCoffee />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Desayuno</h4>
                <p className="text-sm text-gray-600">
                  {lang === 'es' ? 'Desayuno continental' : 'Continental breakfast'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
                  <FaCar />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Estacionamiento</h4>
                <p className="text-sm text-gray-600">
                  {lang === 'es' ? 'Parqueo seguro' : 'Safe parking'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Rooms />
      </main>
      <Footer />
    </div>
  )
}
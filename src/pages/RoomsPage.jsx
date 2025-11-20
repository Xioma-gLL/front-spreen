import Header from '../components/Header'
import Rooms from '../components/Rooms'
import Footer from '../components/Footer'
import { useI18n } from '../context/LanguageContext'
import { useEffect } from 'react'

export default function RoomsPage() {
  const { t } = useI18n()
  useEffect(() => {
    document.title = `${t('pages.rooms.title')} - Hotel Plaza Trujillo`
  }, [t])
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900">{t('pages.rooms.title')}</h1>
          <p className="mt-2 text-gray-700">{t('pages.rooms.subtitle')}</p>
        </section>
        <Rooms />
      </main>
      <Footer />
    </div>
  )
}
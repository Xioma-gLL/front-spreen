import Header from '../components/Header'
import Footer from '../components/Footer'
import { useI18n } from '../context/LanguageContext'
import { useEffect } from 'react'

export default function TourismPage() {
  const { t } = useI18n()
  useEffect(() => {
    document.title = `${t('pages.tourism.title')} - Hotel Plaza Trujillo`
  }, [t])
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900">{t('pages.tourism.title')}</h1>
          <p className="mt-2 text-gray-700">{t('pages.tourism.p1')}</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
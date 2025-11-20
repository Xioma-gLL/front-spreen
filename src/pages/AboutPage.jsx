import Header from '../components/Header'
import Footer from '../components/Footer'
import { useI18n } from '../context/LanguageContext'
import { useEffect } from 'react'

export default function AboutPage() {
  const { t } = useI18n()
  useEffect(() => {
    document.title = `${t('pages.about.title')} - Hotel Plaza Trujillo`
  }, [t])
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900">{t('pages.about.title')}</h1>
          <p className="mt-2 text-gray-700">{t('pages.about.p1')}</p>
          <p className="mt-2 text-gray-700">{t('pages.about.p2')}</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
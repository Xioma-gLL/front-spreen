import Header from '../components/Header'
import Hero from '../components/Hero'
import Rooms from '../components/Rooms'
import Gallery from '../components/Gallery'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useI18n } from '../context/LanguageContext'
import { useEffect } from 'react'

export default function Home() {
  const { t } = useI18n()
  useEffect(() => {
    document.title = `${t('pages.home.title')} - Hotel Plaza Trujillo`
  }, [t])
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <h6 className="text-sm tracking-wide text-gray-600">{t('info.title_prefix')}</h6>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">{t('info.title')}</h2>
              </div>
              <div className="md:col-span-2 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <p className="text-gray-700">{t('info.p1')}</p>
                <p className="mt-2 text-gray-700">{t('info.p2')}</p>
                <p className="mt-2 text-gray-700">{t('info.p3')}</p>
                <p className="mt-2 text-gray-700">{t('info.p4')}</p>
              </div>
            </div>
          </div>
        </section>
        <Rooms />
        <Gallery />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
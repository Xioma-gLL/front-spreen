import Header from '../components/Header'
import Hero from '../components/Hero'
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
      </main>
      <Footer />
    </div>
  )
}
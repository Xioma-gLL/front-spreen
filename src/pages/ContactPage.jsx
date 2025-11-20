import Header from '../components/Header'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useI18n } from '../context/LanguageContext'
import { useEffect } from 'react'

export default function ContactPage() {
  const { t } = useI18n()
  useEffect(() => {
    document.title = `${t('contact.title')} - Hotel Plaza Trujillo`
  }, [t])
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
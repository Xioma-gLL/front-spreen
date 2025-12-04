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
    // 'selection:bg-[#591117] selection:text-white' personaliza el color cuando seleccionas texto
    <div className="min-h-screen flex flex-col w-full relative overflow-x-hidden bg-white selection:bg-[#591117] selection:text-white">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
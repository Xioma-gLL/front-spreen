import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Home from './pages/Home'
import RoomsPage from './pages/RoomsPage'
import AboutPage from './pages/AboutPage'
import TourismPage from './pages/TourismPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habitaciones" element={<RoomsPage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/turismo" element={<TourismPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import RoomsPage from './pages/RoomsPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import UserProfile from './pages/UserProfile'
import TourismPage from './pages/TourismPage'
import ContactPage from './pages/ContactPage'
import ChatWidget from './components/ChatWidget'
import Toast from './components/Toast'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/habitaciones" element={<RoomsPage />} />
            <Route path="/quienes-somos" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/recuperar-contrasena" element={<ForgotPasswordPage />} />
            <Route path="/perfil" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
        <ChatWidget />
        <Toast />
      </AuthProvider>
    </LanguageProvider>
  )
}

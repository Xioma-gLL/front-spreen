import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Home from './pages/Home'
import RoomsPage from './pages/RoomsPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import UserProfile from './pages/UserProfile'
import ContactPage from './pages/ContactPage'
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import Toast from './components/Toast'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ===== RUTAS PÚBLICAS (accesibles para todos) ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/habitaciones" element={<RoomsPage />} />
            <Route path="/quienes-somos" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            
            {/* ===== RUTAS SOLO PARA NO AUTENTICADOS ===== */}
            {/* Si el usuario ya está logueado, lo redirige al inicio */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/registro" element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } />
            <Route path="/recuperar-contrasena" element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            } />
            <Route path="/restablecer-contrasena" element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            } />
            <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
            
            {/* ===== RUTAS PROTEGIDAS (solo usuarios autenticados) ===== */}
            {/* Si el usuario no está logueado, lo redirige al login */}
            <Route path="/perfil" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            {/* Puedes agregar más rutas protegidas aquí, por ejemplo: */}
            {/* <Route path="/mis-reservas" element={
              <ProtectedRoute>
                <MisReservas />
              </ProtectedRoute>
            } /> */}
          </Routes>
        </BrowserRouter>
        <Toast />
      </AuthProvider>
    </LanguageProvider>
  )
}

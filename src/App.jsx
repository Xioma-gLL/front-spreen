import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import ResetPasswordPage from './pages/ResetPasswordPage'
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
            
            {/* Ruta para restablecer contraseña (desde email) */}
            <Route path="/restablecer-contrasena" element={<ResetPasswordPage />} />
            
            {/* OAuth callback */}
            <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
            
            
          </Routes>
        </BrowserRouter>
        <Toast />
      </AuthProvider>
    </LanguageProvider>
  )
}

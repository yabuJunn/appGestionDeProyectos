import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Header() {
  const { isAuthenticated, logout, login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    // Login automático con credenciales mock para facilitar pruebas
    const success = await login('demo@flowai.com', 'demo123')
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-dark-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-white font-bold text-xl">FlowAI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Características
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
              Testimonios
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Precios
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/50"
                >
                  Iniciar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}


import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-white font-bold text-xl">FlowAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Gestión inteligente para pymes con IA y análisis avanzado.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Producto</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Características
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Precios
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Documentación
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Términos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 FlowAI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}


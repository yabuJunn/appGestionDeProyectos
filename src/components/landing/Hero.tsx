import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = async () => {
    // Login automático con credenciales mock
    const success = await login('demo@flowai.com', 'demo123')
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-primary-300 text-sm font-medium">
              Potenciado por IA
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Gestión Inteligente
            <br />
            <span className="text-gradient">para tu Pyme</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Combina la potencia de la Inteligencia Artificial con gestión de inventarios
            y pedidos. Optimiza tu negocio y toma decisiones basadas en datos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold text-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/50 flex items-center space-x-2"
            >
              <span>Empezar Gratis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-dark-800/50 border border-dark-700 text-white rounded-xl font-semibold text-lg hover:bg-dark-800 transition-all">
              Ver Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


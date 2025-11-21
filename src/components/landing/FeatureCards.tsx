import { Brain, Package, TrendingUp, Shield } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'IA Predictiva',
    description: 'Anticipa la demanda y optimiza tu inventario con algoritmos de aprendizaje automático.',
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: 'Gestión de Inventario',
    description: 'Control total sobre tus productos, stock y fechas de vencimiento en tiempo real.',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Análisis Avanzado',
    description: 'Dashboards interactivos con métricas clave para tomar decisiones informadas.',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Seguro y Confiable',
    description: 'Tus datos están protegidos con encriptación de nivel empresarial y backups automáticos.',
  },
]

export default function FeatureCards() {
  return (
    <section id="features" className="py-20 bg-dark-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Todo lo que necesitas en{' '}
            <span className="text-gradient">un solo lugar</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Herramientas poderosas diseñadas específicamente para pequeñas y medianas empresas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-dark-800/50 border border-dark-700 rounded-xl hover:border-primary-500/50 transition-all hover:shadow-lg hover:shadow-primary-500/10"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


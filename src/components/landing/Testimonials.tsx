import { Star, Quote } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'María González',
    role: 'CEO',
    company: 'Distribuidora del Norte',
    content: 'FlowAI transformó nuestra gestión de inventario. Redujimos pérdidas en un 40% y ahora tenemos visibilidad completa en tiempo real.',
    rating: 5,
  },
  {
    name: 'Carlos Ramírez',
    role: 'Gerente de Operaciones',
    company: 'TechSupply Co.',
    content: 'La IA predictiva nos ayuda a anticipar la demanda. Nunca más nos quedamos sin stock de productos clave.',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Fundadora',
    company: 'EcoMarket',
    content: 'El dashboard es increíblemente intuitivo. En minutos entendimos nuestro negocio mejor que en años anteriores.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-dark-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lo que dicen nuestros{' '}
            <span className="text-gradient">clientes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Miles de pymes confían en FlowAI para gestionar su negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-dark-800/50 border border-dark-700 rounded-xl hover:border-primary-500/50 transition-all"
            >
              <Quote className="w-12 h-12 text-primary-500/30 mb-4" />
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.content}</p>
              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">
                  {testimonial.role} • {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


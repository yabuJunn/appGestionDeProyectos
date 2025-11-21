import { CheckCircle, Layers, LineChart, Sparkles, Bell, RefreshCcw, MonitorSmartphone } from 'lucide-react'

interface Step {
    icon: React.ReactNode
    title: string
    description: string
}

const steps: Step[] = [
    {
        icon: <Layers className="w-8 h-8" />,
        title: "Registra tus productos e insumos",
        description:
            "Ingresa ingredientes, cantidades, costos y productos. FlowAI estructura tu inventario y entiende cómo cada insumo se relaciona con tus recetas.",
    },
    {
        icon: <LineChart className="w-8 h-8" />,
        title: "El sistema analiza tu operación",
        description:
            "La IA estudia tu historial de compras, ventas, temporadas y variaciones de demanda para construir patrones predictivos.",
    },
    {
        icon: <Sparkles className="w-8 h-8" />,
        title: "Predicción de lo que vas a necesitar",
        description:
            "FlowAI anticipa qué productos se venderán según clima, día, temporada y comportamiento previo. Calcula el consumo estimado de cada insumo.",
    },
    {
        icon: <CheckCircle className="w-8 h-8" />,
        title: "Recomendaciones automáticas",
        description:
            "Te indica qué comprar, en qué cantidad y cuándo. Si un insumo está caro o escaso, sugiere alternativas compatibles.",
    },
    {
        icon: <Bell className="w-8 h-8" />,
        title: "Alertas inteligentes en tiempo real",
        description:
            "Notificaciones sobre inventario bajo, vencimientos próximos, anomalías de consumo y posibles riesgos de desperdicio.",
    },
    {
        icon: <RefreshCcw className="w-8 h-8" />,
        title: "Actualización automática del inventario",
        description:
            "Cada pedido o venta descuenta insumos automáticamente y recalcula las necesidades, sin ajustes manuales.",
    },
    {
        icon: <MonitorSmartphone className="w-8 h-8" />,
        title: "Dashboard con indicadores clave",
        description:
            "Métricas como margen, rotación, desperdicio, proyecciones y desempeño general del negocio en un panel claro y visual.",
    },
]

export default function HowItWorks() {
    return (
        <section id="pricing" className="py-20 bg-dark-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        ¿Cómo funciona <span className="text-gradient">FlowAI</span>?
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        FlowAI analiza tu negocio en tiempo real, aprende de tu operación y ejecuta acciones inteligentes para optimizar tus recursos sin esfuerzo manual.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="p-8 bg-dark-900/60 border border-dark-700 rounded-xl hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center text-primary-400 mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

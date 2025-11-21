import { useState, useEffect } from 'react'
import { getOrders, Order } from '../../api/orders'
import { useAuth } from '../../contexts/AuthContext'
import { ShoppingCart } from 'lucide-react'

// Mock data para desarrollo
const mockOrders: Order[] = [
  {
    id: '1',
    company_id: 'company-1',
    customer_name: 'Cliente A',
    items: [
      { product_id: '1', quantity: 5, unit_price: 29.99 },
      { product_id: '2', quantity: 2, unit_price: 49.99 },
    ],
    total: 249.93,
    status: 'new',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    company_id: 'company-1',
    customer_name: 'Cliente B',
    items: [{ product_id: '3', quantity: 10, unit_price: 19.99 }],
    total: 199.90,
    status: 'processing',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    company_id: 'company-1',
    customer_name: 'Cliente C',
    items: [{ product_id: '4', quantity: 3, unit_price: 79.99 }],
    total: 239.97,
    status: 'completed',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
]

function getStatusColor(status: Order['status']): {
  label: string
  color: string
  bgColor: string
} {
  const statusMap = {
    new: { label: 'Nuevo', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    processing: { label: 'Procesando', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
    completed: { label: 'Completado', color: 'text-green-400', bgColor: 'bg-green-500/10' },
    cancelled: { label: 'Cancelado', color: 'text-red-400', bgColor: 'bg-red-500/10' },
  }
  return statusMap[status]
}

export default function OrdersList() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      setLoading(true)
      if (user?.company_id) {
        const data = await getOrders(user.company_id)
        // Si no hay datos de Supabase, usar mock data
        setOrders(data.length > 0 ? data : mockOrders)
      } else {
        setOrders(mockOrders)
      }
      setLoading(false)
    }
    loadOrders()
  }, [user])

  if (loading) {
    return (
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-dark-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="w-6 h-6 text-primary-400" />
          <h2 className="text-xl font-bold text-white">Pedidos Recientes</h2>
        </div>
      </div>

      <div className="divide-y divide-dark-700">
        {orders.map((order) => {
          const status = getStatusColor(order.status)
          const date = new Date(order.created_at).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          return (
            <div key={order.id} className="p-6 hover:bg-dark-900/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-white font-semibold">
                      {order.customer_name || 'Cliente sin nombre'}
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.color} ${status.bgColor}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'} • {date}
                  </p>
                  <div className="text-gray-500 text-sm">
                    Total: <span className="text-white font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


import { useState, useEffect } from 'react'
import { getInventory, InventoryItem } from '../../api/inventory'
import { useAuth } from '../../contexts/AuthContext'
import { Package, AlertCircle } from 'lucide-react'

// Mock data para desarrollo
const mockInventory: InventoryItem[] = [
  {
    id: '1',
    product_id: '1',
    quantity: 150,
    expiry_date: '2024-12-31',
    updated_at: new Date().toISOString(),
    product: {
      name: 'Producto A',
      unit_price: 29.99,
    },
  },
  {
    id: '2',
    product_id: '2',
    quantity: 45,
    expiry_date: '2024-11-15',
    updated_at: new Date().toISOString(),
    product: {
      name: 'Producto B',
      unit_price: 49.99,
    },
  },
  {
    id: '3',
    product_id: '3',
    quantity: 200,
    expiry_date: null,
    updated_at: new Date().toISOString(),
    product: {
      name: 'Producto C',
      unit_price: 19.99,
    },
  },
  {
    id: '4',
    product_id: '4',
    quantity: 12,
    expiry_date: '2024-10-20',
    updated_at: new Date().toISOString(),
    product: {
      name: 'Producto D',
      unit_price: 79.99,
    },
  },
]

function getStatus(quantity: number, expiryDate: string | null): {
  label: string
  color: string
  bgColor: string
} {
  if (quantity === 0) {
    return { label: 'Agotado', color: 'text-red-400', bgColor: 'bg-red-500/10' }
  }
  if (quantity < 20) {
    return { label: 'Bajo Stock', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' }
  }
  if (expiryDate) {
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (daysUntilExpiry < 30) {
      return { label: 'Por Vencer', color: 'text-orange-400', bgColor: 'bg-orange-500/10' }
    }
  }
  return { label: 'Disponible', color: 'text-green-400', bgColor: 'bg-green-500/10' }
}

export default function InventoryTable() {
  const { user } = useAuth()
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadInventory() {
      setLoading(true)
      if (user?.company_id) {
        const data = await getInventory(user.company_id)
        // Si no hay datos de Supabase, usar mock data
        setInventory(data.length > 0 ? data : mockInventory)
      } else {
        setInventory(mockInventory)
      }
      setLoading(false)
    }
    loadInventory()
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
          <Package className="w-6 h-6 text-primary-400" />
          <h2 className="text-xl font-bold text-white">Inventario</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Precio Unitario
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {inventory.map((item) => {
              const status = getStatus(item.quantity, item.expiry_date)
              return (
                <tr key={item.id} className="hover:bg-dark-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">
                      {item.product?.name || 'Producto sin nombre'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300">{item.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.color} ${status.bgColor}`}
                    >
                      {item.quantity < 20 && <AlertCircle className="w-3 h-3 mr-1" />}
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300">
                      ${item.product?.unit_price?.toFixed(2) || '0.00'}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}


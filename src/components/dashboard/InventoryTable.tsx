import { useState, useEffect } from 'react'
import { getInventory, InventoryItem } from '../../services/inventory'
import { Package, AlertCircle } from 'lucide-react'

function getStatus(amount: number, amountAlert: number): {
  label: string
  color: string
  bgColor: string
} {
  if (amount === 0) {
    return { label: 'Agotado', color: 'text-red-400', bgColor: 'bg-red-500/10' }
  }
  if (amount <= amountAlert) {
    return { label: 'Alerta de Stock', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' }
  }
  return { label: 'Disponible', color: 'text-green-400', bgColor: 'bg-green-500/10' }
}

export default function InventoryTable() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadInventory() {
      setLoading(true)
      const data = await getInventory()
      setInventory(data)
      setLoading(false)
    }
    loadInventory()
  }, [])

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
                Alerta
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
            {inventory.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  No hay datos de inventario disponibles
                </td>
              </tr>
            ) : (
              inventory.map((item) => {
                const status = getStatus(item.amount, item.amount_alert)
                return (
                  <tr key={`inventory-${item.product}`} className="hover:bg-dark-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">{item.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300">{item.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-400 text-sm">{item.amount_alert.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.color} ${status.bgColor}`}
                    >
                      {item.amount <= item.amount_alert && <AlertCircle className="w-3 h-3 mr-1" />}
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300">${item.price.toFixed(2)}</div>
                  </td>
                </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


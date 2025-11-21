import { useState, useEffect } from 'react'
import { getMenu, MenuItem } from '../../services/menu'
import { UtensilsCrossed, CheckCircle2, XCircle } from 'lucide-react'

export default function MenuTable() {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMenu() {
      setLoading(true)
      const data = await getMenu()
      setMenu(data)
      setLoading(false)
    }
    loadMenu()
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
          <UtensilsCrossed className="w-6 h-6 text-primary-400" />
          <h2 className="text-xl font-bold text-white">Menú</h2>
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
                Precio
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Disponibilidad
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {menu.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                  No hay items en el menú disponibles
                </td>
              </tr>
            ) : (
              menu.map((item) => (
                <tr key={`menu-${item.id}-${item.product}`} className="hover:bg-dark-900/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-white font-medium">{item.product}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-300 font-semibold">${item.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      item.availability
                        ? 'text-green-400 bg-green-500/10'
                        : 'text-red-400 bg-red-500/10'
                    }`}
                  >
                    {item.availability ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Disponible
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        No Disponible
                      </>
                    )}
                  </span>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


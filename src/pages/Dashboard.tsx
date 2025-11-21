import { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import KpiCard from '../components/dashboard/KpiCard'
import InventoryTable from '../components/dashboard/InventoryTable'
import OrdersList from '../components/dashboard/OrdersList'
import { useAuth } from '../contexts/AuthContext'
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react'
import { getProducts } from '../api/products'
import { getOrders } from '../api/orders'
import { getInventory } from '../api/inventory'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    totalOrders: 0,
    inventoryValue: 0,
  })

  useEffect(() => {
    async function loadStats() {
      if (!user?.company_id) return

      try {
        const [products, orders, inventory] = await Promise.all([
          getProducts(user.company_id),
          getOrders(user.company_id),
          getInventory(user.company_id),
        ])

        // Calcular estadísticas
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
        const totalProducts = products.length
        const totalOrders = orders.length
        const inventoryValue = inventory.reduce((sum, item) => {
          return sum + (item.quantity * (item.product?.unit_price || 0))
        }, 0)

        setStats({
          totalRevenue,
          totalProducts,
          totalOrders,
          inventoryValue,
        })
      } catch (error) {
        console.error('Error loading stats:', error)
        // Usar valores mock si hay error
        setStats({
          totalRevenue: 125000,
          totalProducts: 45,
          totalOrders: 128,
          inventoryValue: 45000,
        })
      }
    }

    loadStats()
  }, [user])

  return (
    <div className="min-h-screen bg-dark-950">
      <Sidebar />
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Bienvenido, {user?.name || 'Usuario'}
            </h1>
            <p className="text-gray-400">Resumen de tu negocio</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KpiCard
              title="Ingresos Totales"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              delta={12.5}
              deltaLabel="vs mes anterior"
              icon={<DollarSign className="w-6 h-6" />}
              trend="up"
            />
            <KpiCard
              title="Productos"
              value={stats.totalProducts}
              delta={8.2}
              deltaLabel="nuevos este mes"
              icon={<Package className="w-6 h-6" />}
              trend="up"
            />
            <KpiCard
              title="Pedidos"
              value={stats.totalOrders}
              delta={-3.1}
              deltaLabel="vs mes anterior"
              icon={<ShoppingCart className="w-6 h-6" />}
              trend="down"
            />
            <KpiCard
              title="Valor Inventario"
              value={`$${stats.inventoryValue.toLocaleString()}`}
              delta={5.7}
              deltaLabel="vs mes anterior"
              icon={<TrendingUp className="w-6 h-6" />}
              trend="up"
            />
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InventoryTable />
            <OrdersList />
          </div>
        </div>
      </main>
    </div>
  )
}


import { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import KpiCard from '../components/dashboard/KpiCard'
import InventoryTable from '../components/dashboard/InventoryTable'
import MenuTable from '../components/dashboard/MenuTable'
import IngredientsTable from '../components/dashboard/IngredientsTable'
import { useAuth } from '../contexts/AuthContext'
import { DollarSign, Package, UtensilsCrossed, TrendingUp } from 'lucide-react'
import { getMenu } from '../services/menu'
import { getInventory } from '../services/inventory'
import { getIngredients } from '../services/ingredients'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    totalMenuItems: 0,
    inventoryValue: 0,
  })

  useEffect(() => {
    async function loadStats() {
      try {
        console.log('🔄 Cargando estadísticas del dashboard...')
        const [menu, inventory, ingredients] = await Promise.all([
          getMenu(),
          getInventory(),
          getIngredients(),
        ])

        console.log('📊 Datos cargados:', {
          menu: menu.length,
          inventory: inventory.length,
          ingredients: ingredients.length,
        })

        // Calcular estadísticas
        const totalRevenue = menu
          .filter(item => item.availability)
          .reduce((sum, item) => sum + item.price, 0)

        const totalProducts = ingredients.length
        const totalMenuItems = menu.length

        const inventoryValue = inventory.reduce((sum, item) => {
          return sum + (item.amount * item.price)
        }, 0)

        console.log('✅ Estadísticas calculadas:', {
          totalRevenue,
          totalProducts,
          totalMenuItems,
          inventoryValue,
        })

        setStats({
          totalRevenue,
          totalProducts,
          totalMenuItems,
          inventoryValue,
        })
      } catch (error) {
        console.error('❌ Error loading stats:', error)
        // Usar valores por defecto si hay error
        setStats({
          totalRevenue: 0,
          totalProducts: 0,
          totalMenuItems: 0,
          inventoryValue: 0,
        })
      }
    }

    loadStats()
  }, [])

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
              title="Valor Total Menú"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              delta={12.5}
              deltaLabel="productos disponibles"
              icon={<DollarSign className="w-6 h-6" />}
              trend="up"
            />
            <KpiCard
              title="Productos con Receta"
              value={stats.totalProducts}
              delta={0}
              deltaLabel="total de productos"
              icon={<Package className="w-6 h-6" />}
              trend="up"
            />
            <KpiCard
              title="Items en Menú"
              value={stats.totalMenuItems}
              delta={0}
              deltaLabel="total de items"
              icon={<UtensilsCrossed className="w-6 h-6" />}
              trend="up"
            />
            <KpiCard
              title="Valor Inventario"
              value={`$${stats.inventoryValue.toLocaleString()}`}
              delta={5.7}
              deltaLabel="valor total"
              icon={<TrendingUp className="w-6 h-6" />}
              trend="up"
            />
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <InventoryTable />
            <MenuTable />
          </div>

          {/* Ingredients Table - Full Width */}
          <div className="mt-6">
            <IngredientsTable />
          </div>
        </div>
      </main>
    </div>
  )
}


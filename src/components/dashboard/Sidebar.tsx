import { Link, useLocation } from 'react-router-dom'
import logo from '../../assests/png/LogoFlowAI.png'
import { useAuth } from '../../contexts/AuthContext'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  LogOut,
} from 'lucide-react'

interface NavItem {
  icon: React.ReactNode
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Resumen', path: '/dashboard' },
  { icon: <Package className="w-5 h-5" />, label: 'Inventario', path: '/dashboard' },
  { icon: <ShoppingCart className="w-5 h-5" />, label: 'Pedidos', path: '/dashboard' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Análisis', path: '/dashboard' },
]

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-dark-900 border-r border-dark-800 flex flex-col">
      <div className="p-6 border-b border-dark-800 flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <div className="w-18 h-18 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={logo} alt="logo flowAI" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <li key={`nav-${item.label}-${index}`}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                    }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-dark-800">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-800 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside >
  )
}


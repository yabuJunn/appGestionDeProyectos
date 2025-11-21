import { TrendingUp, TrendingDown } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  delta?: number
  deltaLabel?: string
  icon: React.ReactNode
  trend?: 'up' | 'down'
}

export default function KpiCard({
  title,
  value,
  delta,
  deltaLabel,
  icon,
  trend = 'up',
}: KpiCardProps) {
  const isPositive = trend === 'up'
  const deltaColor = isPositive ? 'text-green-400' : 'text-red-400'
  const deltaBg = isPositive ? 'bg-green-500/10' : 'bg-red-500/10'

  return (
    <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6 hover:border-primary-500/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400">
          {icon}
        </div>
        {delta !== undefined && (
          <div className={`px-2 py-1 rounded-md ${deltaBg} ${deltaColor} text-xs font-semibold flex items-center space-x-1`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{delta > 0 ? '+' : ''}{delta}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {deltaLabel && (
        <p className="text-gray-500 text-xs">{deltaLabel}</p>
      )}
    </div>
  )
}


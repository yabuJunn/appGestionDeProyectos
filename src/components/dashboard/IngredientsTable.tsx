import { useState, useEffect } from 'react'
import { getIngredients, Ingredient } from '../../services/ingredients'
import { ChefHat } from 'lucide-react'

export default function IngredientsTable() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null)

  useEffect(() => {
    async function loadIngredients() {
      setLoading(true)
      const data = await getIngredients()
      setIngredients(data)
      setLoading(false)
    }
    loadIngredients()
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
          <ChefHat className="w-6 h-6 text-primary-400" />
          <h2 className="text-xl font-bold text-white">Ingredientes por Producto</h2>
        </div>
      </div>

      <div className="divide-y divide-dark-700">
        {ingredients.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No hay ingredientes disponibles
          </div>
        ) : (
          ingredients.map((item) => (
            <div
              key={`ingredient-${item.id}-${item.product}`}
              className="p-6 hover:bg-dark-900/30 transition-colors cursor-pointer"
              onClick={() => setExpandedProduct(expandedProduct === item.id ? null : item.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{item.product}</h3>
                  {expandedProduct === item.id && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.ingredients.map((ingredient, index) => (
                        <span
                          key={`ing-${item.id}-${index}-${ingredient}`}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-primary-500/10 text-primary-300 border border-primary-500/20"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}
                {expandedProduct !== item.id && (
                  <p className="text-gray-400 text-sm">
                    {item.ingredients.length} ingredientes • Click para ver
                  </p>
                )}
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">
                  {expandedProduct === item.id ? '▲' : '▼'}
                </span>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  )
}


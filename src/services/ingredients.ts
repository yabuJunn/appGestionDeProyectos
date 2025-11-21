import { supabase } from '../lib/supabase'

export interface Ingredient {
  id: number
  product: string
  ingredients: string[]
}

export async function getIngredients(): Promise<Ingredient[]> {
  try {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Supabase error fetching ingredients:', error)
      throw error
    }

    console.log('Ingredients raw data fetched:', data)

    // Parsear el array de ingredientes si viene como string JSON
    const parsed = (data || []).map(item => {
      let parsedIngredients = item.ingredients
      if (typeof item.ingredients === 'string') {
        try {
          parsedIngredients = JSON.parse(item.ingredients)
        } catch (e) {
          console.warn('Error parsing ingredients JSON:', e)
          parsedIngredients = []
        }
      }

      return {
        ...item,
        ingredients: Array.isArray(parsedIngredients) ? parsedIngredients : []
      }
    })

    console.log('Ingredients parsed data:', parsed)
    return parsed
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    return []
  }
}

export async function getIngredientById(id: number): Promise<Ingredient | null> {
  try {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) return null

    let parsedIngredients = data.ingredients
    if (typeof data.ingredients === 'string') {
      try {
        parsedIngredients = JSON.parse(data.ingredients)
      } catch (e) {
        console.warn('Error parsing ingredients JSON:', e)
        parsedIngredients = []
      }
    }

    return {
      ...data,
      ingredients: Array.isArray(parsedIngredients) ? parsedIngredients : []
    }
  } catch (error) {
    console.error('Error fetching ingredient:', error)
    return null
  }
}

export async function getIngredientsByProduct(product: string): Promise<Ingredient | null> {
  try {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .eq('product', product)
      .single()

    if (error) throw error

    if (!data) return null

    let parsedIngredients = data.ingredients
    if (typeof data.ingredients === 'string') {
      try {
        parsedIngredients = JSON.parse(data.ingredients)
      } catch (e) {
        console.warn('Error parsing ingredients JSON:', e)
        parsedIngredients = []
      }
    }

    return {
      ...data,
      ingredients: Array.isArray(parsedIngredients) ? parsedIngredients : []
    }
  } catch (error) {
    console.error('Error fetching ingredient by product:', error)
    return null
  }
}


import { supabase } from '../lib/supabase'

export interface Product {
  id: string
  company_id: string
  name: string
  description: string | null
  unit_price: number
  created_at: string
}

export async function getProducts(companyId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating product:', error)
    return null
  }
}


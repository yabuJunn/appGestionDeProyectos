import { supabase } from '../lib/supabase'

export interface InventoryItem {
  product: string
  amount: number
  price: number
  amount_alert: number
}

export async function getInventory(): Promise<InventoryItem[]> {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('product', { ascending: true })

    if (error) {
      console.error('Supabase error fetching inventory:', error)
      throw error
    }
    
    console.log('Inventory data fetched:', data)
    return data || []
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return []
  }
}

export async function getInventoryByProduct(product: string): Promise<InventoryItem | null> {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('product', product)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching inventory item:', error)
    return null
  }
}

export async function getLowStockItems(): Promise<InventoryItem[]> {
  try {
    // Obtener todos los items y filtrar en el cliente
    // ya que Supabase no soporta comparación de columnas directamente en la query
    const allItems = await getInventory()
    return allItems.filter(item => item.amount <= item.amount_alert)
  } catch (error) {
    console.error('Error fetching low stock items:', error)
    return []
  }
}

export async function updateInventoryAmount(
  product: string,
  amount: number
): Promise<InventoryItem | null> {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .update({ amount })
      .eq('product', product)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating inventory amount:', error)
    return null
  }
}

export async function updateInventoryPrice(
  product: string,
  price: number
): Promise<InventoryItem | null> {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .update({ price })
      .eq('product', product)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating inventory price:', error)
    return null
  }
}


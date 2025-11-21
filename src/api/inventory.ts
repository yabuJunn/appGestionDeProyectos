import { supabase } from '../lib/supabase'

export interface InventoryItem {
  id: string
  product_id: string
  quantity: number
  expiry_date: string | null
  updated_at: string
  product?: {
    name: string
    unit_price: number
  }
}

export async function getInventory(companyId: string): Promise<InventoryItem[]> {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select(`
        *,
        product:products!inner(*)
      `)
      .eq('product.company_id', companyId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return []
  }
}

export async function updateInventory(
  inventoryId: string,
  quantity: number
): Promise<InventoryItem | null> {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq('id', inventoryId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating inventory:', error)
    return null
  }
}


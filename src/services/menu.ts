import { supabase } from '../lib/supabase'

export interface MenuItem {
  id: number
  product: string
  price: number
  availability: boolean
}

export async function getMenu(): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Supabase error fetching menu:', error)
      throw error
    }
    
    console.log('Menu data fetched:', data)
    return data || []
  } catch (error) {
    console.error('Error fetching menu:', error)
    return []
  }
}

export async function getMenuById(id: number): Promise<MenuItem | null> {
  try {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return null
  }
}

export async function getAvailableMenu(): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .eq('availability', true)
      .order('id', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching available menu:', error)
    return []
  }
}

export async function updateMenuAvailability(
  id: number,
  availability: boolean
): Promise<MenuItem | null> {
  try {
    const { data, error } = await supabase
      .from('menu')
      .update({ availability })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating menu availability:', error)
    return null
  }
}

export async function updateMenuPrice(
  id: number,
  price: number
): Promise<MenuItem | null> {
  try {
    const { data, error } = await supabase
      .from('menu')
      .update({ price })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating menu price:', error)
    return null
  }
}


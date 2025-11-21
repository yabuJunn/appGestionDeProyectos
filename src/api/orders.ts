import { supabase } from '../lib/supabase'

export interface OrderItem {
  product_id: string
  quantity: number
  unit_price: number
}

export interface Order {
  id: string
  company_id: string
  customer_name: string | null
  items: OrderItem[]
  total: number
  status: 'new' | 'processing' | 'completed' | 'cancelled'
  created_at: string
}

export async function getOrders(companyId: string): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating order:', error)
    return null
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating order status:', error)
    return null
  }
}


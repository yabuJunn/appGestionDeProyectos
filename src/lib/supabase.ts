import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase URL o Anon Key no están configuradas. Usa variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY')
  console.warn('URL:', supabaseUrl ? '✅ Configurada' : '❌ No configurada')
  console.warn('Key:', supabaseAnonKey ? '✅ Configurada' : '❌ No configurada')
} else {
  console.log('✅ Supabase configurado correctamente')
  console.log('URL:', supabaseUrl.substring(0, 30) + '...')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)


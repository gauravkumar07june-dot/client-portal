import { supabase } from '../lib/supabaseClient.js'

export async function fetchStaff() {
  const { data, error } = await supabase
    .from('staff')
    .select('id, name, role')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

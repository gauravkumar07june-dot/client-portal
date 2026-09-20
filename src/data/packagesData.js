import { supabase } from '../lib/supabaseClient.js'

// Backs both the dashboard's progress-by-building chart and the package
// tracker table — same table, same shape, fetched once.
export async function fetchPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('id, name, status, owner, target_date, progress_percent')
    .order('created_at', { ascending: true })

  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    status: row.status,
    owner: row.owner,
    targetDate: row.target_date,
    percent: row.progress_percent,
  }))
}

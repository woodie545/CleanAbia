import { supabase } from '../lib/supabase'


export async function getRecyclingCentres() {
  const { data, error } =
    await supabase
      .from('recycling_centres')
      .select('*')
      .eq('is_active', true)
      .order('name')

  if (error) {
    throw error
  }

  return data
}

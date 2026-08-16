import { supabase } from '../lib/supabase'


export async function getAllReports() {
  const { data, error } =
    await supabase
      .from('reports')
      .select(`
        *,
        profiles!reports_reporter_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
      .order('created_at', {
        ascending: false,
      })

  if (error) {
    throw error
  }

  return data
}


export async function getAllAgents() {
  const { data, error } =
    await supabase
      .from('agent_profiles')
      .select(`
        *,
        profiles (
          id,
          full_name,
          phone,
          avatar_url
        )
      `)
      .order('created_at', {
        ascending: false,
      })

  if (error) {
    throw error
  }

  return data
}


export async function getAllWithdrawals() {
  const { data, error } =
    await supabase
      .from('withdrawal_requests')
      .select('*')
      .order('requested_at', {
        ascending: false,
      })

  if (error) {
    throw error
  }

  return data
}


export async function getAllJobs() {
  const { data, error } =
    await supabase
      .from('jobs')
      .select(`
        *,
        reports (
          id,
          title,
          address,
          category
        ),
        profiles!jobs_agent_id_fkey (
          id,
          full_name
        )
      `)
      .order('created_at', {
        ascending: false,
      })

  if (error) {
    throw error
  }

  return data
}

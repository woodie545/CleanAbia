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
        ),
        report_images (
          id,
          public_url
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
      .select(`
        *,
        profiles!withdrawal_requests_user_id_fkey (
          id,
          full_name,
          role
        )
      `)
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

export async function confirmReport(
  reportId,
  points = 10,
  payoutAmount = 0
) {
  const { data, error } =
    await supabase.rpc('confirm_report', {
      p_report_id: reportId,
      p_points: points,
      p_payout_amount: payoutAmount,
    })

  if (error) {
    throw error
  }

  return data
}


export async function rejectReport(reportId) {
  const { data, error } =
    await supabase
      .from('reports')
      .update({ status: 'rejected' })
      .eq('id', reportId)
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}


export async function getAllReporters() {
  const { data, error } =
    await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        phone,
        location,
        is_active,
        points_balance,
        created_at,
        reports (id)
      `)
      .eq('role', 'reporter')
      .order('created_at', {
        ascending: false,
      })

  if (error) {
    throw error
  }

  return data
}


// Admins are exempt from protect_agent_verification, so these
// updates go through even though agents can't touch these fields
// on themselves.
export async function verifyAgent(agentProfileId) {
  const { data, error } =
    await supabase
      .from('agent_profiles')
      .update({
        is_verified: true,
        verification_status: 'verified',
        verified_at: new Date().toISOString(),
      })
      .eq('id', agentProfileId)
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}


export async function rejectAgent(agentProfileId) {
  const { data, error } =
    await supabase
      .from('agent_profiles')
      .update({
        is_verified: false,
        verification_status: 'rejected',
      })
      .eq('id', agentProfileId)
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}


export async function updateWithdrawalStatus(withdrawalId, status) {
  const { data, error } =
    await supabase
      .from('withdrawal_requests')
      .update({ status })
      .eq('id', withdrawalId)
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}


export async function getAllRecyclingCentres() {
  const { data, error } =
    await supabase
      .from('recycling_centres')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

  if (error) {
    throw error
  }

  return data
}


export async function createRecyclingCentre(centre) {
  const { data, error } =
    await supabase
      .from('recycling_centres')
      .insert({
        name: centre.name,
        address: centre.address,
        lga: centre.lga,
        phone: centre.phone,
        accepted_materials: centre.accepted_materials,
      })
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}


export async function setRecyclingCentreActive(centreId, isActive) {
  const { data, error } =
    await supabase
      .from('recycling_centres')
      .update({ is_active: isActive })
      .eq('id', centreId)
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}

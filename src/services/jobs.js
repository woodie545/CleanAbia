import { supabase } from '../lib/supabase'

export async function getAvailableJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      reports (
        id,
        report_code,
        title,
        description,
        category,
        priority,
        address,
        lga,
        latitude,
        longitude
      )
    `)
    .eq('status', 'open')
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    throw error
  }

  return data
}


export async function getMyJobs() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      reports (
        id,
        report_code,
        title,
        description,
        category,
        priority,
        address,
        lga,
        latitude,
        longitude
      ),
      job_events (
        id,
        event_type,
        note,
        created_at
      )
    `)
    .eq('agent_id', user.id)
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    throw error
  }

  return data
}

export async function acceptJob(jobId) {
  const { data, error } =
    await supabase.rpc('accept_job', {
      p_job_id: jobId,
    })

  if (error) {
    throw error
  }

  return data
}

export async function completeJob(
  jobId,
  note = null
) {
  const { data, error } =
    await supabase.rpc('complete_job', {
      p_job_id: jobId,
      p_note: note,
    })

  if (error) {
    throw error
  }

  return data
}

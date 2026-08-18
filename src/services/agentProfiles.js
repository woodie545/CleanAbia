import { supabase } from '../lib/supabase'


export async function getMyAgentProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const { data, error } = await supabase
    .from('agent_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}


// Used during agent sign-up to create the agent_profiles row
// alongside the auth account. NIN/ABSSIN are collected here but
// verification itself (is_verified / verification_status) can
// only be changed by an admin - see protect_agent_verification.
export async function createMyAgentProfile({
  address,
  lga,
  nin,
  abssin,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const { data, error } = await supabase
    .from('agent_profiles')
    .insert({
      user_id: user.id,
      address,
      lga,
      nin,
      abssin,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}


export async function updateMyAgentProfile(updates) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const allowedUpdates = {
    address: updates.address,
    lga: updates.lga,
    is_available: updates.is_available,
  }

  const { data, error } = await supabase
    .from('agent_profiles')
    .update(allowedUpdates)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

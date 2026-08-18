import { supabase } from '../lib/supabase'


export async function getMyProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}


export async function uploadAvatar(file) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const extension =
    file.name.split('.').pop()

  const filePath =
    `${user.id}/${crypto.randomUUID()}.${extension}`

  const { error: uploadError } =
    await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true,
      })

  if (uploadError) {
    throw uploadError
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  return updateMyProfile({ avatar_url: publicUrl })
}


export async function updateMyProfile(updates) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const allowedUpdates = {
    full_name: updates.full_name,
    phone: updates.phone,
    location: updates.location,
    avatar_url: updates.avatar_url,
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(allowedUpdates)
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

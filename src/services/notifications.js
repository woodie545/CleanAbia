import { supabase } from '../lib/supabase'


export async function getMyNotifications() {
  const { data, error } =
    await supabase
      .from('notifications')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

  if (error) {
    throw error
  }

  return data
}


export async function markNotificationAsRead(
  notificationId
) {
  const { data, error } =
    await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', notificationId)
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}


export async function markAllNotificationsAsRead() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const { error } =
    await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('is_read', false)

  if (error) {
    throw error
  }
}

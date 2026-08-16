import { supabase } from '../lib/supabase'


export async function requestWithdrawal({
  amount,
  bankName,
  accountName,
  accountNumber,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in.')
  }

  const { data, error } =
    await supabase
      .from('withdrawal_requests')
      .insert({
        user_id: user.id,
        amount,
        bank_name: bankName,
        account_name: accountName,
        account_number: accountNumber,
      })
      .select()
      .single()

  if (error) {
    throw error
  }

  return data
}


export async function getMyWithdrawals() {
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

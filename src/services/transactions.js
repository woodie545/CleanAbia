import { supabase } from '../lib/supabase'


export async function getMyTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      jobs (
        id,
        job_code
      ),
      reports (
        id,
        report_code
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


export async function getMyEarnings() {
  const transactions =
    await getMyTransactions()

  const completed =
    transactions.filter(
      transaction =>
        transaction.status === 'completed'
    )

  const earnings =
    completed
      .filter(transaction =>
        [
          'job_reward',
          'report_reward',
          'adjustment',
        ].includes(transaction.type)
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      )

  const withdrawals =
    completed
      .filter(transaction =>
        transaction.type === 'withdrawal'
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      )

  return {
    transactions,
    earnings,
    withdrawals,
    available: earnings - withdrawals,
  }
}

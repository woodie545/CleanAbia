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
  const transactions = await getMyTransactions()

  const earningTypes = [
    'job_reward',
    'report_reward',
    'adjustment',
  ]

  const earningsTransactions = transactions.filter(
    (transaction) =>
      earningTypes.includes(transaction.type)
  )

  const completedEarnings =
    earningsTransactions.filter(
      (transaction) =>
        transaction.status === 'completed'
    )

  const pendingEarnings =
    earningsTransactions.filter(
      (transaction) =>
        transaction.status === 'pending'
    )

  const withdrawalTransactions =
    transactions.filter(
      (transaction) =>
        transaction.type === 'withdrawal'
    )

  const completedWithdrawals =
    withdrawalTransactions.filter(
      (transaction) =>
        transaction.status === 'completed'
    )

  const totalEarnings = completedEarnings.reduce(
    (total, transaction) =>
      total + Number(transaction.amount),
    0
  )

  const pending = pendingEarnings.reduce(
    (total, transaction) =>
      total + Number(transaction.amount),
    0
  )

  const paidOut = completedWithdrawals.reduce(
    (total, transaction) =>
      total + Number(transaction.amount),
    0
  )

  const available = Math.max(
    0,
    totalEarnings - paidOut
  )

  const now = new Date()

  const monthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  )

  const thisMonth = completedEarnings
    .filter(
      (transaction) =>
        new Date(transaction.completed_at) >= monthStart
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    )

  return {
    totalEarnings,
    thisMonth,
    pending,
    paidOut,
    available,
    transactions,
  }
}
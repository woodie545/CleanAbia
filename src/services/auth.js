import { supabase } from '../lib/supabase'

export async function signUp({
  email,
  password,
  fullName,
  role = 'reporter',
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    throw error
  }

  return data
}


export async function signIn(email, password) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (error) {
    throw error
  }

  return data
}


export async function signOut() {
  const { error } =
    await supabase.auth.signOut()

  if (error) {
    throw error
  }
}


export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  return user
}


export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return session
}


export async function resetPassword(email) {
  const { error } =
    await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    throw error
  }
}


export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}

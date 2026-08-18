import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'

import { supabase } from '../lib/supabase'
import { getMyProfile } from '../services/profiles'
import { signOut as signOutRequest } from '../services/auth'

const AuthContext =
  createContext(null)


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  // Tracks profile fetch separately so a slow/failed profile
  // lookup never blocks the initial auth check.
  const [profileLoading, setProfileLoading] = useState(false)

  const loadProfile = useCallback(async () => {
    setProfileLoading(true)
    try {
      const data = await getMyProfile()
      setProfile(data)
    } catch (err) {
      console.error('Failed to load profile:', err)
      setProfile(null)
    } finally {
      setProfileLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      setUser(session?.user ?? null)
      setLoading(false)

      if (session?.user) {
        loadProfile()
      }
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return

        setUser(session?.user ?? null)
        setLoading(false)

        if (session?.user) {
          loadProfile()
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [loadProfile])

  // Lets a dashboard refresh the profile after an update
  // (e.g. after saving a profile edit) without a full reload.
  const refreshProfile = useCallback(() => {
    if (user) {
      return loadProfile()
    }
    return Promise.resolve()
  }, [user, loadProfile])

  const signOut = useCallback(async () => {
    await signOutRequest()
    setUser(null)
    setProfile(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role: profile?.role ?? null,
        loading,
        profileLoading,
        isAuthenticated: !!user,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return context
}

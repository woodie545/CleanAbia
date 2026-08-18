import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Maps a profile role to the dashboard route it belongs on.
// Used to bounce a signed-in user to the right place if they
// try to open a dashboard that isn't theirs.
export const ROLE_HOME = {
  reporter: '/reporter',
  agent: '/agent',
  admin: '/admin',
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const {
    isAuthenticated,
    loading,
    profileLoading,
    role,
  } = useAuth()

  if (loading || (isAuthenticated && profileLoading && !role)) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-gray-50'>
        <p className='text-gray-600 font-medium'>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (
    allowedRoles &&
    role &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to={ROLE_HOME[role] ?? '/'}
        replace
      />
    )
  }

  return children
}

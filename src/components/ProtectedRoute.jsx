import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ROLE_HOME = {
  reporter: '/reporterdashboard',
  agent: '/agentdashboard',
  admin: '/admindashboard',
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

  // 1. Wait until BOTH auth session and user profile/role are fully resolved
  if (loading || profileLoading) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-gray-50'>
        <p className='text-gray-600 font-medium'>Loading...</p>
      </div>
    )
  }

  // 2. Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // Normalize role string to handle database casing inconsistencies
  const normalizedRole = role?.toLowerCase()

  // 3. Strict Role Verification
  if (allowedRoles && allowedRoles.length > 0) {
    // If user has no valid role OR their role is not allowed for this route
    if (!normalizedRole || !allowedRoles.includes(normalizedRole)) {
      const destination = ROLE_HOME[normalizedRole] ?? '/login'
      return <Navigate to={destination} replace />
    }
  }

  return children
}

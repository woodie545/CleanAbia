import React, { useState, useEffect, useCallback } from 'react'
import Aside from './aside'
import Main from './main'
import { getAvailableJobs, getMyJobs, acceptJob, completeJob } from '../services/jobs'
import { getMyEarnings } from '../services/transactions'
import { useAuth } from '../hooks/useAuth'

export default function Agents() {
  const [pages, setPages] = useState('Overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { profile, profileLoading } = useAuth()
  const [jobs, setJobs] = useState([])
  const [myJobs, setMyJobs] = useState([])
  const [earnings, setEarnings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Profile comes from AuthProvider (already loaded on sign-in),
  // so this only needs to load jobs/earnings from Supabase.
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [jobsData, myJobsData, earningsData] = await Promise.all([
        getAvailableJobs(),
        getMyJobs(),
        getMyEarnings(),
      ])

      setJobs(jobsData || [])
      setMyJobs(myJobsData || [])
      setEarnings(earningsData)
    } catch (err) {
      console.error("Error loading agent dashboard data:", err)
      setError("Failed to load dashboard data. Please refresh.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  const handleAcceptJob = async (jobId) => {
    try {
      await acceptJob(jobId)
      await loadDashboardData()
    } catch (err) {
      console.error("Failed to accept job:", err)
      throw err
    }
  }

  const handleCompleteJob = async (jobId) => {
    try {
      await completeJob(jobId)
      await loadDashboardData()
    } catch (err) {
      console.error("Failed to complete job:", err)
      throw err
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  if (loading || profileLoading) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-gray-50'>
        <p className='text-gray-600 font-medium'>Loading agent dashboard...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full'>
      <div className='grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-screen'>

        {/* Sidebar */}
        <Aside
          setPages={setPages}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          profile={profile}
          activePage={pages}
        />

        {/* Main content */}
        <main className='min-w-0 w-full'>
          <Main
            pages={pages}
            toggleMobileMenu={toggleMobileMenu}
            profile={profile}
            jobs={jobs}
            myJobs={myJobs}
            earnings={earnings}
            onAcceptJob={handleAcceptJob}
            onCompleteJob={handleCompleteJob}
            error={error}
          />
        </main>

      </div>
    </div>
  )
}

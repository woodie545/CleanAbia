import React, { useState, useEffect } from 'react'
import Aside from './aside'
import Main from './main'
import { getAvailableJobs, acceptJob } from '../services/jobs'
import { getUserProfile } from '../services/profiles'

export default function Agents() {
  const [pages, setPages] = useState('Overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [profile, setProfile] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch initial profile and available jobs from Supabase
  useEffect(() => {
    async function loadAgentData() {
      try {
        setLoading(true)
        setError(null)

        const [profileData, jobsData] = await Promise.all([
          getUserProfile(),
          getAvailableJobs()
        ])

        setProfile(profileData)
        setJobs(jobsData || [])
      } catch (err) {
        console.error("Error loading agent dashboard data:", err)
        setError("Failed to load dashboard data. Please refresh.")
      } finally {
        setLoading(false)
      }
    }

    loadAgentData()
  }, [])

  // Handler for accepting a job
  const handleAcceptJob = async (jobId) => {
    try {
      await acceptJob(jobId)
      // Refresh available jobs after accepting
      const updatedJobs = await getAvailableJobs()
      setJobs(updatedJobs || [])
    } catch (err) {
      console.error("Failed to accept job:", err)
      throw err
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  if (loading) {
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
            setProfile={setProfile}
            jobs={jobs}
            onAcceptJob={handleAcceptJob}
            error={error}
          />
        </main>

      </div>
    </div>
  )
}

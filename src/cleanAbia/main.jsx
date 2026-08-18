import React from 'react'
import Profile from './Profile'
import Earnings from './Earnings'
import Abiaproj from './Abiaproj'

// "Job Offers" and "My Jobs" both render the Overview page since it
// already shows open offers and the active job side-by-side.
const OVERVIEW_PAGES = ['Overview', 'Job Offers', 'My Jobs']

export default function Main({
  pages,
  toggleMobileMenu,
  profile,
  jobs,
  myJobs,
  earnings,
  onAcceptJob,
  onCompleteJob,
  error,
}) {
  return (
    <div>
       {pages === 'Profile' && <Profile/>}
       {pages === 'Earnings' && <Earnings/>}
       {OVERVIEW_PAGES.includes(pages) && (
        <Abiaproj
          profile={profile}
          toggleMobileMenu={toggleMobileMenu}
          jobs={jobs}
          myJobs={myJobs}
          earnings={earnings}
          onAcceptJob={onAcceptJob}
          onCompleteJob={onCompleteJob}
        />
      )}
      {error && (
        <div className="fixed bottom-5 right-5 z-50 bg-red-100 text-red-700 px-4 py-3 rounded-xl shadow-lg text-sm max-w-xs">
          {error}
        </div>
      )}
    </div>
  )
}

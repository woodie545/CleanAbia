import React, { useState } from 'react'
import Aside from './aside'
import Main from './main'

export default function Agents() {
  const [pages, setPages] = useState('Overview')

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Emeka Okafor',
    phone: '09163930859',
    email: 'emeka.okafor@gmail.com',
    location: 'Umuahia, Abia State',
  })

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
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
        />

        {/* Main content */}
        <main className='min-w-0 w-full'>
          <Main
            pages={pages}
            toggleMobileMenu={toggleMobileMenu}
            profile={profile}
            setProfile={setProfile}
          />
        </main>

      </div>

    </div>
  )
}
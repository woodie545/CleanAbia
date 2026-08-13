import React from 'react'
import Profile from './Profile'
import Earnings from './Earnings'
import Abiaproj from './Abiaproj'

export default function Main({ pages, toggleMobileMenu, profile, setProfile }) {
  return (
    <div>
       {pages === 'Profile' && (<Profile profile={profile} setProfile={setProfile}/>)} 
       {pages === 'Earnings' && <Earnings/>}
        {pages === 'Overview' && (
        <Abiaproj profile={profile} toggleMobileMenu={toggleMobileMenu} />
      )}
    </div>
  )
}

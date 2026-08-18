import React, { useState } from 'react'
import UserRoles from '../SignUp/UserRole'
import SignReporter from '../SignUp/SignReporter'
import SignAgent from '../SignUp/SignAgent'

export default function Signup() {
   const [page, setPage] = useState('userRoles')
  return (
    <div>
      
       {page === "userRoles" && <UserRoles setPage={setPage}/>}
        {page === "Reporter" && <SignReporter setPage={setPage}/>}
        {page === "Agent" && <SignAgent setPage={setPage}/>}
    </div>
  )
}

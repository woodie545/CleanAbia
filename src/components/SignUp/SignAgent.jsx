import React, { useState } from 'react'
import AgentSignup from '../agentsignup/AgentSignup'
import Terms from '../agentsignup/terms'
import UserRoles from './UserRole'


export default function SignAgent({ setPage: setTopLevelPage }) {
  const [page, setPage] = useState("agentSignup")
  return (
    <div>
      {page === "Userrole" && (
        <UserRoles
          setPage={(next) => {
            // "Reporter" needs to bubble up to the top-level
            // Signup switcher; everything else stays local.
            if (next === "Reporter" && setTopLevelPage) {
              setTopLevelPage("Reporter")
            } else {
              setPage(next)
            }
          }}
        />
      )}
      {page === "agentSignup" && <AgentSignup setPage={setPage}/>}
      {page === "terms" && <Terms setPage={setPage}/> }
    </div>
  )
}

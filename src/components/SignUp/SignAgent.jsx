import React, { useState } from 'react'
import AgentSignup from '../agentsignup/AgentSignup'
import Terms from '../agentsignup/terms'

export default function SignAgent() {
  const [page, setPage] = useState("agentSignup")
  return (
    <div>
      {page === "agentSignup" && <AgentSignup setPage={setPage}/>}
      {page === "terms" && <Terms setPage={setPage}/> }
    </div>
  )
}

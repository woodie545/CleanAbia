import React from 'react'
import { signupSteps } from './array'
import AgentSignChild from './child'
import { FaHeart } from 'react-icons/fa6'

export default function AgentSignup({setPage}) {
  return (
    <section className='flex font-sans'>
        <section className='bg-[#123A28] w-[50%] text-white pt-12 hidden lg:block h-screen sticky top-0'>
          <div className='m-auto w-[80%] space-y-6 pr-20'>
            <div className='flex items-center gap-2'>
                <img src="logo.svg" alt="CleanAbia logo" className='w-9 h-9 shrink-0' />
                <p className='font-semibold text-[21px]'>CleanAbia</p>
            </div>
            <p className='font-semibold text-3xl pb-7'>Job offers land in your dashboard the moment a site is confirmed</p>
            <div className='space-y-6'>
                {signupSteps.map(step=>
                    <div key={step.id} className='flex items-center gap-3'>
                      <span className='text-[#C77E0F] border-2 border-[#C77E0F] h-10 w-10 flex shrink-0 items-center justify-center rounded-full'>{step.no}</span>
                       <div>
                        <p className='font-semibold text-xl'>{step.sum}</p>
                        <p className='text-sm'>{step.step}</p>
                       </div>
                    </div>
                )}
            </div>
          </div>
        </section>
        <AgentSignChild setPage={setPage}/>
    </section>
  )
}

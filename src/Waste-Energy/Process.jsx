import React from 'react'
import { BsLightningCharge } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { GoPlusCircle } from 'react-icons/go'
import { SiHackthebox } from 'react-icons/si'

export const theProcess = [
    {icon: <SiHackthebox />,
     title: "1. Collection & sorting",
     para: "Drop-offs are weighed and separated into plastics, metals, paper and organics at the zone centre."
    },
    {icon: <FiSettings />,
     title: "2. Pre-processing",
     para: "Organics are shredded and dried; recoverable plastics and metals are baled for transport."
    },
    {icon: <BsLightningCharge />,
     title: "3. Conversion",
     para: "Organic matter goes through anaerobic digestion; non-recyclable residue is processed for energy recovery."
    },
    {icon: <GoPlusCircle />,
     title: "4. Grid distribution",
     para: "Generated electricity is fed into the local grid, powering homes and businesses nearby."
    }
]

function Process() {
  return (
    <section className='bg-[#F3F5EE] px-6 py-16 sm:px-10 lg:px-16' id='/tracker'>
      <div className='mx-auto max-w-6xl space-y-8'>

        <div className='max-w-2xl space-y-3'>
          <h4 className='text-sm font-semibold uppercase tracking-[0.3em] text-[#3db97d]'>— The process</h4>
          <h1 className='font-mono text-3xl font-bold leading-tight tracking-wide text-[#1E5B3E] sm:text-4xl'>
            How the conversion actually works
          </h1>
        </div>

        <div className='rounded-xl bg-white p-6 shadow-sm sm:p-10'>

          {/* Icon row with connecting line */}
          <div className='relative mb-6 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8'>
            <div className='pointer-events-none absolute top-1/2 left-[12.5%] right-[12.5%] hidden h-px -translate-y-1/2 bg-[#1E5B3E]/20 md:block' />
            {theProcess.map((e, index) => (
              <div key={index} className='relative z-10 flex justify-center'>
                <div className='flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#1E5B3E] bg-white text-2xl text-[#1E5B3E]'>
                  {e.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Titles & descriptions */}
          <div className='grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8'>
            {theProcess.map((e, index) => (
              <div key={index} className='space-y-2 text-center'>
                <h3 className='text-base font-semibold text-[#0f4028] sm:text-lg'>{e.title}</h3>
                <p className='text-sm leading-relaxed text-[#696d6b]'>{e.para}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-4 rounded-xl bg-white p-6 text-base leading-relaxed text-[#696d6b] sm:p-8'>
          <p>
            The bulk of the energy conversion happens through anaerobic digestion: sorted organic waste is broken
            down by microorganisms in sealed tanks, without oxygen, releasing biogas that's rich in methane. That
            biogas is captured and burned to drive turbines, generating electricity in much the same way a gas
            power plant does — the difference is the fuel source is diverted waste rather than fossil gas.
          </p>

          <p>
            Material that isn't suitable for digestion or resale — heavily contaminated plastics, mixed residue —
            is routed to a separate energy-recovery process, where controlled combustion generates heat that's
            converted into additional electricity, with emissions filtered before release.
          </p>

          <p>
            The resulting power is sold into the local grid through CleanAbia's energy partners, and the revenue
            from that sale is part of what funds collector and agent payouts — closing the loop between what you
            throw away and what keeps the lights on down the street.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Process

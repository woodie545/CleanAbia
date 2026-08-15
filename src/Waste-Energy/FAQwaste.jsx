import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { NavLink } from 'react-router-dom';

export const comQuest = [
    {id: 1,
     question: "What happens to plastics that can't be recycled?",
     answer: "Heavily contaminated or low-grade plastic that can't be resold is routed to energy recovery rather than landfills."
    },
    {id: 2,
     question: "How is the electricity distributed?",
     answer: "Generated power is sold into the local grid through CleanAbia's energy partners, rather than delivered directly to individual homes."
    },
    {id: 3,
     question: "Is this environmentally safe?",
     answer: "Emissions from the energy-recovery process are filtered before release, and organics processing uses sealed anaerobic digestion, not open burning."
    },
    {id: 4,
     question: "Who verifies the conversion numbers?",
     answer: "Monthly tonnage and output figures are reconciled with our recycling-centre and energy partners and reflected on the admin dashboard."
    },
]

function FAQwaste() {

    const [reveal, setReveal] = useState(null);

    function showAnswer(id) {
        setReveal((current) => (current === id ? null : id));
    }

  return (
    <section className='space-y-16 bg-[#DEE3D8] py-16'>

        <div className='mx-auto max-w-3xl px-6 sm:px-10 lg:px-0'>
            <div className='space-y-3 pb-8'>
                <h4 className='text-sm font-semibold uppercase tracking-[0.3em] text-[#3db97d]'>— FAQ</h4>
                <h1 className='font-mono text-3xl font-bold tracking-wide text-[#1E5B3E] sm:text-4xl'>Common questions</h1>
            </div>

            <div className='divide-y divide-[#1E5B3E]/15 rounded-xl bg-white/60'>
               {comQuest.map((f) => {
                   const isOpen = reveal === f.id;
                   return (
                    <div key={f.id} className='px-5 sm:px-7'>
                        <button
                            type='button'
                            onClick={() => showAnswer(f.id)}
                            aria-expanded={isOpen}
                            className='flex w-full items-center justify-between gap-4 py-5 text-left'
                        >
                            <span className='font-semibold text-[#1E5B3E] text-base sm:text-lg'>{f.question}</span>
                            <FiPlus
                                className={`shrink-0 text-xl text-[#1E5B3E] transition-transform duration-300 ${
                                    isOpen ? 'rotate-45' : ''
                                }`}
                            />
                        </button>

                        <div
                            className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                            <div className='overflow-hidden'>
                                <p className='max-w-xl text-sm leading-relaxed text-[#696d6b] sm:text-base'>{f.answer}</p>
                            </div>
                        </div>
                    </div>
                   );
               })}
            </div>
        </div>

        <div className='bg-[#E4EEE7] px-6 py-14 sm:px-10'>
            <div className='mx-auto max-w-2xl space-y-8 text-center'>
                <p className='font-mono text-xl font-semibold text-[#0f4028] sm:text-2xl'>
                    Bring your recyclables in — the loop pays you for it
                </p>
                <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                    <a
                        href='#'
                        className='w-full rounded-full bg-[#1E5B3E] px-7 py-3.5 text-center font-medium text-white transition-colors hover:bg-[#24714c] sm:w-auto'
                    >
                        View drop-off zones
                    </a>
                    <NavLink
                        to="/Reporter"
                        className='w-full rounded-full border-2 border-[#1E5B3E] px-7 py-3.5 text-center font-medium text-[#1E5B3E] transition-colors hover:bg-[#1E5B3E] hover:text-white sm:w-auto'
                    >
                        Sign up as reporter
                    </NavLink>
                </div>
            </div>
        </div>

    </section>
  )
}

export default FAQwaste

import React from 'react'

export default function Problem() {
  return (
    <section className='mt-10 flex flex-col lg:flex-row justify-between items-center gap-10 mx-10 lg:mx-20 mt-10'>
        <div className='flex-1'>
            <div className='flex items-center gap-2 pb-5'>
                <div className='bg-green-800 w-10 h-[2px]'/>
                <p className='text-green-700 font-light text-xl '>THE PROBLEM</p>
            </div>
            <h2 className='font-semibold text-2xl text-[#052E16]'>Waste management in Abia State is a coordination problem, not just a cleanup problem</h2>
        </div>
        <div className='flex-1 text-green-800 flex flex-col gap-5 text-[#2d6b52]'>
            <p>
                Illegal dumping and blocked drainage are common across Abia's LGAs, and it's rarely because nobody notices—it's because 
                reporting a dirty site to the right people has traditionally taken time, and there's been no incentive for anyone to 
                act quickly. Meanwhile, recyclable materials that could generate income and energy end up in the same pile as everything else.
            </p>
            <p>
                CleanAbia treats these as one connected system: a resident's report becomes an agent's job, and an agent's collected 
                recyclables become both a paycheck and a feedstock for local energy generation. Fixing the coordination gap is waht 
                fixes the streets.
            </p>
        </div>
    </section>
  )
}

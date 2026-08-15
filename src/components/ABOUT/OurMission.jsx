import React from 'react'
import { missionList } from './Mission'

export default function OurMission() {
  return (
    <section className='bg-[#E4EEE6] mt-12'>
      <div className='p-10'>
        <div className='flex flex-col lg:flex-row items-center gap-2 pb-5'>
            <div className='bg-green-800 w-10 h-[2px]'/>
            <p className='text-green-700 font-light text-xl '>WHY WE EXIST</p>
        </div>
        <h2 className='font-semibold text-2xl'>Mission, vision and where we're headed</h2>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 mx-8 pb-8 gap-7'>
        {missionList.map((o) => (
          <div key={o.id} className='bg-white px-5 pt-5 pb-4 rounded-lg'>
            <p className='bg-[#E4EEE6] text-xl text-green-800 inline-flex rounded-lg p-3 text-2xl items-center'><o.icon /></p>
            <h2 className='text-2xl font-semibold mt-3'>{o.title}</h2>
            <p className='mission-note mt-3 text-[#2d6b52]'>{o.note}</p>
          </div>
        ))}
      </div>
    </section>


  )
}

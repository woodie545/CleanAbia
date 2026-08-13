import React from 'react'
import { valuesList } from './ValueList'

export default function Values() {
  return (
    <section className='bg-[#f3f6f1]'>
        <div className='p-10'>
            <div className='flex flex-col lg:flex-row items-center gap-2 pb-5'>
            <div className='bg-green-800 w-10 h-[2px]'/>
            <p className='text-green-700 font-light text-xl '>WHAT WE STAND FOR</p>
        </div>
        <h2 className='text-2xl ml-5 font-semibold'>Our Values</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-5 pb-8'>
            {valuesList.map((v) => (
                <div key={v.index} className='bg-white px-5 pt-5 pb-4 rounded-lg shadow-md shadow-gray-200'>
                    <p className='bg-[#E4EEE6] text-xl text-green-800 inline-flex rounded-lg p-3 text-2xl items-center'><v.icon /></p>
                    <h2 className='text-xl font-semibold mt-3'>{v.title}</h2>
                    <p className='mt-3 text-[#2d6b52] font-light'>{v.description}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

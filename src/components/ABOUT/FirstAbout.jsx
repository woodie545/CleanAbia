import React from 'react'
import { CgArrowLongLeft } from "react-icons/cg";
import { NavLink } from 'react-router-dom';

export default function FirstAbout() {
  return (
    <section className='mx-10 lg:mx-20 mt-10 w-[75%] lg:w-[54%]'>
        <NavLink to="/" className='flex items-center gap-2 text-green-800 font-bold'>
            <CgArrowLongLeft className='text-5xl'/>
            <h3 className='text-xl'>Back to home</h3>
        </NavLink>
        <div className='flex items-center gap-2'>
            <div className='bg-green-800 w-10 h-[2px]'/>
            <h3 className='text-green-700 font-light text-xl'>ABOUT CLEANABIA</h3>
        </div>
        <h2 className='font-semi-bold text-4xl mt-5'>Built to make Abia State's streets clean — and pay you for it</h2>
        <p className='text-[#2d6b52] mt-5'>CleanAbia bagan as a final-year group project built around one question: what would it actually take for residents to report a dirty site, and for and for agents to show up and clear it? Our answer was to remove every point of friction — and to make sure evreyone in the chain gets paid for their part in it.</p>
    </section>
  )
}

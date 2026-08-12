import React from 'react'

export default function Action() {
  return (
    <section className='bg-[#f3f6f1] p-10'>
        <h2 className='flex justify-center font-semibold text-xl'>Ready to be part of the loop?</h2>
     <div className='flex gap-5 justify-center mt-5 mb-10'>
      <button className="bg-[#165c3d] text-white py-3 px-5 rounded-3xl hover:bg-amber-400 hover:text-[#165c3d] font-semibold">Sign up as Reporter</button>
      <button className="bg-amber-400 text-[#165c3d] py-3 px-5 rounded-3xl hover:bg-[#165c3d] hover:text-white font-semibold">Sign up as Agent</button>
      </div> 
    </section>
  )
}

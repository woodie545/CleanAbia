import React from 'react'
import { BsLightningCharge } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import { NavLink } from 'react-router-dom'
// import Hero from '../ui/Hero'


const nath = [{Path: "/", title: "Recyling"},
   {Path: "/Wastetoenergy", title: "Waste to Energy"},
   {Path: "/contact", title: "Contact"},]

   const authlinks = [
  { path: "/login", title: "Login" },
  { path: "/signup", title: "Sign up" },
];



export default function About() {
  return (
    // <header>
    //   <img/>
    //   <p>Clean Abia</p>

    //   <nav>
    //     {nath.map((n) => 
    //     <NavLink key={n.title} to = {n.path}>
    //       {n.title}
    //     </NavLink>
    //     )
    //   }
    //   </nav>

    //     <nav className='flex gap-10'>
    //           {authlinks.map((n) => (
    //             <NavLink
    //               key={n.title}
    //               to={n.path}
    //               className={"border-[#206E30] border px-3 py-1 rounded-md"}>
    //               {n.title}
    //             </NavLink>
    //           ))}
    //         </nav>
    // </header>
<div>
     <section className='ml-5'>
                      <h3 className="text-[#1f5a3e] text-xs sm:text-sm font-mono tracking-widest mt-15 font-semibold">
                          ←  Back to home
                          </h3>
                          <p className='text-green-300 mt-3 '> — ABOUT TO CLEANABIA</p>
                          <p className = "text-black text-2xl mt-3 font-bold">Built to make Abia state's streets<br></br> clean — and pay you for it</p>
                          <p>
                            Clean Abia began as a final-year group project built 
                            around one question what <br></br>would it actually take for residents 
                            to report a dirty site, and for residents to report a dirty site, 
                            and for agents to show up <br></br> and clean it? our answer  was to remove every point of 
                            friction — and to make <br></br> sure  everyone in the chain get paid in it.
                          </p>
            </section>
<p>
  Illegal dumping and blocked drainage are common across Abia's LGAs, and it's rarely because nobody notices
</p>

        <p className='text-2xl ml-5'>Our Values</p>
      <div className='flex gap-10 mt-5 ml-5'>
        
        <div className='border  rounded-md p-5 '>
          <CiLocationOn className='flex justify-start    rounded-md text-2xl text-green-300   '/>
          <p className='font-bold'>Transparency</p>
          <p>Every report's status, every payout, and every job's outcome is tracked
           and visible to the person who's owed it</p>
        </div>
        <div className='border rounded-md p-5 '>
          <GoPeople className='flex justify-start  text-2xl text-green-300 ' />
            <p className='font-bold'>Community-first</p>
            <p>Reporters and agents aren't users of  the platform, they're the platform — every design decision starts with them.</p>
        </div>
        <div className='border  rounded-md p-5 '>
          <IoMdCheckmark className='flex justify-start     text-2xl text-green-900 bg-gray-200 rounded-md  '/>
          <p className='font-bold'>Accountability</p>
          <p>Confirmed reports get confirmed actions. if a job is accepted, the other agents are notified immediately so nobody duplicates effort.</p>
          </div>
          <div className='border  rounded-md p-5 '>
            <BsLightningCharge className='flex justify-start  text-2xl text-green-300 '  />
            <p className='font-bold'>Sustainability</p>
            <p>we  measure success not just in sites cleared, but in kilograms diverted from landfill and converted into usable energy</p>
          </div>
      </div>
      <div className='bg-green-50'>
        <div className='flex ml-80 flex-col py-10 pl-10'>
        <p className='mt-15 font-light text-green-700 '>— ROADMAP</p>
        <p className='font-bold mt-5'>Where we're headed</p>
        
        <div className=' flex mt-7  '>
          <p className=' text-white border w-10 text-center py-1  rounded-full bg-green-800' >26</p>
          <p className='text-md text-green-700 mt-3 ml-3'> 2026</p>

        </div>
         <p className='font-bold ml-10 '>Pilot launch</p>
            <p className='ml-10 text-gray-400 mt-3'>Live in Aba South and Aba North with 
              reporting reporting , agent dispatch and two recyling zones.</p>
              <p>— ROADMAP</p>
              <p>Where we're headed</p>
              <div className=' mt-7  '>
          <p className=' text-white border w-10 text-center py-1  rounded-full bg-green-800' >26</p>
          <p className='text-md text-green-700 mt-3 ml-3'> 2026</p>
          <p className='font-bold ml-10 '>Pilot launch</p>
            <p className='ml-10 text-gray-400 mt-3'>Live in Aba South and Aba North with 
              reporting reporting , agent dispatch and two recyling zones.</p>
              




        </div>
      </div>

      </div>
      
</div>
  )
}
           
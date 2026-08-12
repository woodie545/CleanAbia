import React from 'react'
import { BsLightningCharge } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import { NavLink } from 'react-router-dom'
import Hero from '../ui/Hero'
import { DollarSign, Eye, Zap } from 'lucide-react';



const partners = [
  'ABIA MIN. OF ENVIRONMENT',
  'GREENGRID ENERGY',
  'UMUAHIA LGA COUNCIL',
  'ARIARIA TRADERS UNION',
  'NASENI ABIA',
];

const cards = [
  {
    icon: DollarSign,
    title: 'Our mission',
    description:
      'Make it effortless for every Abia resident to report, clear and recycle waste — and get paid fairly for the effort they put in.',
  },
  {
    icon: Eye,
    title: 'Our vision',
    description:
      'A state where no dumpsite outlives a single report, and waste is treated as a resource that funds households, not a burden that\'s ignored.',
  },
  {
    icon: Zap,
    title: 'Our goals',
    description:
      'Clear 100,000 reported sites, pay out over ₦500M to reporters and agents, and help power 10,000 homes from recovered waste by 2030.',
  },
];
const nath = [{Path: "/", title: "Recyling"},
   {Path: "/Wastetoenergy", title: "Waste to Energy"},
   {Path: "/contact", title: "Contact"},]

   const authlinks = [
  { path: "/login", title: "Login" },
  { path: "/signup", title: "Sign up" },
];
const roadmap = [
  {
    year : "2026",
    badge: "26",
    title: "Pilot launch",
    description:
      "Live in Aba South and Aba North with reporting, agent dispatch and two recycling zones.",
  },
  {
    year: "2027",
    badge: "27",
    title: "State-wide expansion",
    description:
      "Rolling out to 10 LGAs across Abia State, with four additional recycling zones.",
  },
  {
    year: "2028",
    badge: "28",
    title: "Dedicated conversion facility",
    description:
      "Partnership-backed waste-to-energy facility purpose-built for CleanAbia's recovered material.",
  },
  {
    year: "2030",
    badge: "30",
    title: "100,000 sites cleared",
    description:
      "₦500M+ paid out to reporters and agents; 10,000 homes powered from recovered waste.",
  },
];



export default function About() {
  return (
    <div>
      <section className="bg-[#f7f9f4] py-16 px-6 md:px-12 font-sans text-gray-800">
        <div className="max-w-6xl mx-auto space-y-16">
        
          {/* Partners Banner */}
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium mb-8 tracking-wide">
                In partnership with
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {partners.map((partner, index) => (
                  <span
                key={index}
                className="text-xs sm:text-sm font-mono tracking-widest text-gray-500 font-semibold uppercase"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2">
            <span className="w-4 h-[1.5px] bg-[#1a4332]" />
            <span className="text-xs font-semibold tracking-widest text-[#1a4332] uppercase">
              ABOUT CLEANABIA
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d2a1f] tracking-tight leading-tight">
            Cleaner streets, real income, homegrown energy
          </h2>

          {/* Paragraph */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            CleanAbia started as a final-year group project focused on one question: what would it take for Abia State residents to actually want to report a dirty site? The answer was to make it fast, and to make it pay.
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href="#learn-more"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-900 text-gray-900 text-xs sm:text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
            >
              Learn more about CleanAbia
              <span>→</span>
            </a>
          </div>
        </div>

        {/* 3-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] flex flex-col items-start text-left space-y-4"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-lg bg-[#e2f0e8] text-[#1a4332] flex items-center justify-center">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-[#0d2a1f]">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>

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

        <p className='text-2xl ml-5'>Our Values</p>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5 ml-5'>
        
        <div className='border  rounded-md p-5 '>
          <CiLocationOn className='flex justify-start bg-gray-200   rounded-md text-4xl p-2 text-green-900   '/>
          <p className='font-bold mt-3'>Transparency</p>
          <p>Every report's status, every payout, and every job's outcome is tracked
           and visible to the person who's owed it</p>
        </div>
        <div className='border   rounded-md p-5 '>
          <GoPeople className='flex justify-start  text-4xl p-2  text-green-900 bg-gray-200 rounded-md  ' />
            <p className='font-bold mt-3'>Community-first</p>
            <p>Reporters and agents aren't users of  the platform, they're the platform — every design decision starts with them.</p>
        </div>
        <div className='border  rounded-md p-5 '>
          <IoMdCheckmark className='flex justify-start     text-4xl p-2 text-green-900 bg-gray-200 rounded-md  '/>
          <p className='font-bold mt-3'>Accountability</p>
          <p>Confirmed reports get confirmed actions. if a job is accepted, the other agents are notified immediately so nobody duplicates effort.</p>
          </div>
          <div className='border   rounded-md p-5 '>
            <BsLightningCharge className='flex justify-start  text-4xl p-2 bg-gray-200 text-green-900 rounded-md '  />
            <p className='font-bold mt-3 '>Sustainability</p>
            <p className=' text-gray-400 mt-5'>we  measure success not just in sites cleared, but in kilograms diverted from landfill and converted into usable energy</p>
          </div>
      </div>
      <div className='bg-green-50'>
        <div className='flex ml-80 flex-col py-10 sm:pr-40 md:pl-1 lg:pl-10'>
        <p className='mt-15 font-light text-green-700 '>— ROADMAP</p>
        <p className='font-bold mt-5'>Where we're headed</p>
        
        <div className=' flex mt-7  '>
          <p className=' text-white border w-10 text-center py-1  rounded-full bg-green-800' >26</p>
          <p className='text-md text-green-700 mt-3 ml-3'> 2026</p>

        </div>
         <p className='font-bold ml-10 '>Pilot launch</p>
            <p className='ml-10 text-gray-400 mt-3'>Live in Aba South and Aba North with 
              reporting reporting , agent dispatch and two recyling zones.</p>
              
              <div className=' mt-7  '>
         


    <section className="w-full bg-[#f3f6f1] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Top label */}
        <div className="flex items-center gap-3 text-[#2d6b52] uppercase tracking-[0.2em] text-xs font-semibold mb-4">
          <span className="w-10 h-px bg-[#2d6b52]"></span>
          <span>Roadmap</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#111827] mb-12">
          Where we're headed
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-[#d6ddd4]"></div>

          <div className="space-y-14">
            {roadmap.map((item) => (
              <div key={item.year} className="relative flex gap-6">
                {/* Circle */}
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#165c3d] text-white text-sm font-bold shadow-sm">
                  {item.badge}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <p className="text-sm font-semibold text-[#2d6b52] mb-1">
                    {item.year}
                  </p>

                  <h3 className="text-2xl font-bold text-[#111827] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-7 text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  





        </div>
      </div>

      </div>
      
      <p className='flex justify-center'>Ready to be part of the loop?</p>
     <div className='flex gap-5 justify-center mt-5 mb-10'>
      <button className="bg-[#165c3d] text-white py-2 px-4 rounded-md hover:bg-amber-800">Sign as a Reporter</button>
      <button className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-[#165c3d]">Sign as an Agent</button>
      </div> 
      
</div>
  



    
  );
}
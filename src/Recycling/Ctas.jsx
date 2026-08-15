//import React from 'react'
//import { useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { NavLink } from "react-router-dom";


export default function Ctas() {
   
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-[#EEF5EE] rounded-4xl p-12 flex flex-col lg:flex-row justify-between items-center gap-10">

          <div>

            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">

              <FiMapPin className="text-[#17382B] text-3xl" />

            </div>

            <h2 className="text-4xl font-bold text-[#17382B] leading-tight">

              Ready to recycle?

            </h2>

            <p className="text-[#17382B] mt-5 max-w-xl leading-8">

              Find the nearest recycling centre, prepare your recyclable
              materials and help keep Abia State cleaner while earning rewards.

            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <NavLink to="/Reporter" className="bg-[#D8A63B] hover:bg-[#c89428] transition text-white px-8 py-4 rounded-full font-semibold">

             Sign up as Reporter

            </NavLink>

            <NavLink to="/Agent" className="bg-white hover:bg-gray-100 transition text-[#17382B] px-8 py-4 rounded-full font-semibold">

              Sign up as Agent

            </NavLink>

          </div>

        </div>

      </div>
    </section>
  )
}
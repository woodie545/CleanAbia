import React from 'react';
import { FaRegBell, FaSackDollar } from "react-icons/fa6";
import { BsGrid } from "react-icons/bs";
import { LuCircleDollarSign } from 'react-icons/lu';
import { GoPerson, GoStack } from 'react-icons/go';
import { RxStopwatch } from 'react-icons/rx';
import { GrLocationPin } from 'react-icons/gr';

export default function Abia() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen'>
      {/* ............................ ASIDE .................................. */}
      <aside className='hidden md:flex flex-col min-h-screen text-white bg-[#123A28] p-5'>
        <div className='flex-1'>
          <div className='flex my-5 -ml-1 items-center'>
            <img src="/Logo.png" alt="logo" className='h-10 w-10' />
            <h2 className='pt-1 font-medium text-2xl text-white ml-2'>CleanAbia</h2>
          </div>
          <section className='font-medium space-y-5 mt-8'>
            <div className='flex items-center gap-3 hover:font-bold cursor-pointer'>
              <BsGrid className='text-xl' />
              <p>Overview</p>
            </div>
            <div className='flex items-center gap-3 hover:font-bold cursor-pointer'>
              <FaRegBell className='text-xl' />
              <p>Job Offers</p>
            </div>
            <div className='flex items-center gap-3 hover:font-bold cursor-pointer'>
              <GoStack className='text-xl' />
              <p>My Jobs</p>
            </div>
            <div className='flex items-center gap-3 hover:font-bold cursor-pointer'>
              <LuCircleDollarSign className='text-xl' />
              <p>Earnings</p>
            </div>
            <div className='flex items-center gap-3 hover:font-bold cursor-pointer'>
              <GoPerson className='text-xl' />
              <p>Profile</p>
            </div>
          </section>
        </div>

        <section className='mt-auto pb-4'>
          <button className='border px-8 py-1 rounded-2xl hover:bg-white hover:text-[#123A28] transition-colors'>Log out</button>
          <div className='border-b border-gray-500 mt-5'></div>
          <div className='flex gap-3 mt-4 items-center'>
            <div className='flex items-center justify-center rounded-full bg-[#F2A93B] text-[#123A28] font-bold w-12 h-12'>
              EN
            </div>
            <div>
              <h3 className='font-bold'>Emeka Nwosu</h3>
              <p className='text-sm text-gray-300'>Agent.Umuahia</p>
            </div>
          </div>
        </section>
      </aside>

      {/* .......................Main Body ...................................... */}
      <section className='bg-[#E4EEE7] p-4 sm:p-8 overflow-x-hidden'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl sm:text-3xl font-serif'>Welcome Back, Emeka</h1>
          <div className='p-3 bg-[#FFFFFF] rounded-full shadow-sm shrink-0 cursor-pointer'>
            <FaRegBell className='text-lg' />
          </div>
        </div>
        <p className='text-[#5B6B60] text-sm mt-1 sm:mt-0'>3 new job offers near Aba South.</p>

        {/* ......................First Grid ............................................... */}
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6'>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-sm border border-gray-300'>
            <p className='text-[#5B6B60] text-sm'>Jobs Completed</p>
            <p className='font-bold text-2xl text-[#123A28]'>58</p>
            <p className='text-[#1E5B3E] text-sm'>+4 this week</p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-md border border-gray-300'>
            <p className='text-[#5B6B60] text-sm'>Total Earnings</p>
            <p className='font-bold text-2xl text-[#123A28]'>₦312,000</p>
            <p className='text-[#1E5B3E] text-sm'>This year</p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-md border border-gray-300'>
            <p className='text-[#5B6B60] text-sm'>Rating</p>
            <p className='font-bold text-2xl text-[#123A28]'>4.9</p>
            <p className='text-[#1E5B3E] text-sm'>From 52 reviews </p>
          </div>
          <div className='bg-[#FFFFFF] rounded-xl p-4 space-y-2 shadow-md border border-gray-300'>
            <p className='text-[#5B6B60] text-sm'>Active Job</p>
            <p className='font-semibold text-lg text-[#103a27]'>Faulks Rd Market</p>
            <p className='text-[#1E5B3E] text-sm'> In progress</p>
          </div>
        </section>

        {/* ........................... Second Grid  ............................... */}
        <section className='flex flex-col xl:flex-row gap-5'>
          {/* Left Column */}
          <section className='bg-[#FFFFFF] rounded-xl py-5 px-4 sm:px-7 w-full xl:w-[70%] shadow-lg'>
            <div className='flex justify-between items-center'>
              <p className='text-lg font-medium'>Open job offers</p>
              <button className='text-[#123A28] font-medium hover:underline'>View map</button>
            </div>

            {/* Job Card 1 */}
            <div className='border border-gray-300 rounded-xl mb-2 mt-4 py-5 px-4 sm:px-6 space-y-3'>
              <div className='flex justify-between flex-wrap gap-2 mb-2'>
                <h3 className='font-medium'>Ogbor Hill Rd, Aba South</h3>
                <p className='text-[#5B6B60] text-sm'>2 min ago</p>
              </div>
              <p className='bg-blue-100 text-blue-800 font-medium py-1 px-3 text-xs sm:text-sm text-center w-max rounded-full'>NEW OFFER</p>
              <p className='text-[#5B6B60] text-sm'>Overflowing bin blocking pedestrian walkway. Confirmed by admin.</p>
              <div className='flex flex-wrap gap-4 sm:gap-7'>
                <div className='flex gap-1 items-center'>
                  <GrLocationPin />
                  <p className='text-[#5B6B60] text-sm'>1.2km away</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <FaSackDollar className='text-orange-500' />
                  <p className='text-[#5B6B60] text-sm'>₦2,500 est.</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <RxStopwatch />
                  <p className='text-[#5B6B60] text-sm'>30 min job</p>
                </div>
              </div>
              <div className='flex flex-wrap gap-3 sm:gap-5 pt-2'>
                <button className='bg-amber-400 font-medium rounded-full px-5 py-2 text-sm sm:text-base w-full sm:w-auto'>
                  Accept job
                </button>
                <button className='font-medium rounded-full px-5 py-2 border border-black text-sm sm:text-base w-full sm:w-auto'>
                  View details
                </button>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className='border border-gray-300 rounded-xl mb-2 mt-4 py-5 px-4 sm:px-6 space-y-3'>
              <div className='flex justify-between flex-wrap gap-2 mb-2'>
                <h3 className='font-medium'>Milverton Rd, Aba North</h3>
                <p className='text-[#5B6B60] text-sm'>18 min ago</p>
              </div>
              <p className='bg-blue-100 text-blue-800 font-medium py-1 px-3 text-xs sm:text-sm text-center w-max rounded-full'>NEW OFFER</p>
              <p className='text-[#5B6B60] text-sm'>Blocked drainage causing waterlogging near junction.</p>
              <div className='flex flex-wrap gap-4 sm:gap-7'>
                <div className='flex gap-1 items-center'>
                  <GrLocationPin />
                  <p className='text-[#5B6B60] text-sm'>3.4km away</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <FaSackDollar className='text-orange-500' />
                  <p className='text-[#5B6B60] text-sm'>₦3,200 est.</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <RxStopwatch />
                  <p className='text-[#5B6B60] text-sm'>45 min job</p>
                </div>
              </div>
              <div className='flex flex-wrap gap-3 sm:gap-5 pt-2'>
                <button className='bg-amber-400 font-medium rounded-full px-5 py-2 text-sm sm:text-base w-full sm:w-auto'>
                  Accept job
                </button>
                <button className='font-medium rounded-full px-5 py-2 border border-black text-sm sm:text-base w-full sm:w-auto'>
                  View details
                </button>
              </div>
            </div>

            {/* Job Card 3 */}
            <div className='border border-gray-300 rounded-xl mb-2 mt-4 py-5 px-4 sm:px-6 space-y-3'>
              <div className='flex justify-between flex-wrap gap-2'>
                <h3 className='text-[#5B6B60] font-medium'>Ndoni St, Umuahia</h3>
                <p className='text-[#5B6B60] text-sm'>1 hr ago</p>
              </div>
              <p className='text-green-800 bg-green-100 font-medium py-1 px-3 text-xs sm:text-sm text-center w-max rounded-full'>CLAIMED</p>
              <p className='text-[#9b9f96] text-sm'>Claimed by Agent Ifeoma B, — no longer available.</p>
              <div className='flex flex-wrap gap-4 sm:gap-7'>
                <div className='flex gap-1 items-center'>
                  <GrLocationPin />
                  <p className='text-[#9b9f96] text-sm'>8.1km away</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <FaSackDollar className='text-orange-500' />
                  <p className='text-[#9b9f96] text-sm'>₦2,000 est.</p>
                </div>
              </div>
            </div>
          </section>

          {/* .......................Right Side Part........................................ */}
          <section className='w-full xl:w-[30%] space-y-5'>
            <div className='p-5 sm:p-7 bg-white rounded-xl shadow-lg'>
              <h2 className='font-medium text-lg'>Active job</h2>
              {/* Map Placeholder */}
              <div className='h-48 sm:h-52 w-full bg-gradient-to-r from-[#1E5B3E] to-[#123A28] rounded-2xl my-5'></div>
              <h2 className='font-bold pb-1'>Faulks Rd Market</h2>
              <p className='text-[#5B6B60] mb-8 text-sm sm:text-base'>Recyclables drop-off pending confirmation</p>

              <div className='flex gap-3 my-4'>
                <p className='bg-[#1E5B3E] rounded-full p-1 w-3 h-3 mt-1.5 shrink-0'></p>
                <div>
                  <p className='font-bold text-sm sm:text-base'>Job accepted</p>
                  <p className='text-[#5B6B60] text-sm'>Today, 9:14am</p>
                </div>
              </div>
              <div className='border-b border-[#DEE3D8]'></div>
              
              <div className='flex gap-3 my-4'>
                <p className='bg-[#1E5B3E] rounded-full p-1 w-3 h-3 mt-1.5 shrink-0'></p>
                <div>
                  <p className='font-bold text-sm sm:text-base'>Site cleared</p>
                  <p className='text-[#5B6B60] text-sm'>Today, 10:02am</p>
                </div>
              </div>
              <div className='border-b border-[#DEE3D8]'></div>
              
              <div className='flex gap-3 mt-4 mb-2'>
                <p className='bg-[#DEE3D8] rounded-full p-1 w-3 h-3 mt-1.5 shrink-0'></p>
                <div>
                  <p className='font-bold text-sm sm:text-base'>Drop-off confirmed & paid</p>
                  <p className='text-[#5B6B60] text-sm'>Pending</p>
                </div>
              </div>
            </div>

            {/* ............................... Earnings Box .................................*/}
            <div className='bg-white p-6 sm:p-8 rounded-xl shadow-lg'>
              <p className='text-lg font-semibold text-center sm:text-left'>This week's earnings</p>
              <p className='text-center text-3xl sm:text-4xl font-bold text-[#123A28] my-6'>₦18,400</p>
            </div>
          </section>
        </section>
      </section>
    </main>
    
  );
}

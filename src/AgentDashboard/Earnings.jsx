import React from 'react'
import { FaRegBell, FaRegCreditCard } from 'react-icons/fa6'
import { IoWallet } from 'react-icons/io5'
import Withdrawal from './Withdrawal'
import { MdOutlineTrendingUp } from 'react-icons/md'
import { FaRegClock } from 'react-icons/fa'

export default function Earnings() {

  const earnGrid = [
    {
      id: 1,
      icon: IoWallet,
      title: 'Total Earnings',
      amount: '₦312,000',
      para: 'All Time',
    },
    {
      id: 2,
      icon: MdOutlineTrendingUp,
      title: 'This Month',
      amount: '₦48,500',
      para: 'May, 2025',
    },
    {
      id: 3,
      icon: FaRegClock,
      title: 'Pending Payout',
      amount: '₦12,000',
      para: 'will be paid soon',
    },
    {
      id: 4,
      icon: FaRegCreditCard,
      title: 'Total Paid Out',
      amount: '₦300,000',
      para: 'All Time',
    }
  ]

  return (

    <main className='bg-[#E4EEE7] min-h-screen w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden'>

      {/* ================= HEADER ================= */}

      <div className='flex items-start justify-between gap-4 mb-6'>

        <div className='min-w-0'>
          <h1 className='text-xl sm:text-2xl font-medium text-[#123A28]'>
            Earnings
          </h1>

          <p className='text-sm sm:text-base text-[#5B6B60] mt-1'>
            Track your earnings, transactions and withdraw your money.
          </p>
        </div>

        <button
          className='bg-white rounded-full p-3 shrink-0 shadow-sm hover:bg-gray-50 transition'
          aria-label='Notifications'
        >
          <FaRegBell className='text-[#123A28]' />
        </button>

      </div>


      {/* ================= EARNINGS CARDS ================= */}

      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>

        {earnGrid.map((value) => {

          const Icon = value.icon

          return (

            <div
              key={value.id}
              className='bg-white rounded-2xl px-4 py-5 flex items-center gap-3 min-w-0 shadow-sm'
            >

              {/* Icon */}

              <div className='bg-green-100 text-green-800 p-3 rounded-full shrink-0'>
                <Icon className='text-xl sm:text-2xl' />
              </div>


              {/* Text */}

              <div className='space-y-1 min-w-0'>

                <p className='font-medium text-sm sm:text-base truncate'>
                  {value.title}
                </p>

                <p className='text-xl sm:text-2xl font-medium truncate'>
                  {value.amount}
                </p>

                <p className='text-sm text-[#5B6B60]'>
                  {value.para}
                </p>

              </div>

            </div>

          )
        })}

      </section>


      {/* ================= WITHDRAWAL ================= */}

      <section className='mt-6 w-full'>
        <Withdrawal />
      </section>

    </main>
  )
}
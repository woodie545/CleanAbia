import React from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import { MdLockOutline, MdOutlineGppGood } from 'react-icons/md'

export default function Withdrawal() {

  return (
    <main className='mt-5 w-full'>

      {/* ================= MAIN WITHDRAWAL CARD ================= */}

      <section className='bg-white p-4 sm:p-5 rounded-2xl w-full'>

        <section className='grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6'>

          {/* ================= PAYMENT FORM ================= */}

          <section className='w-full min-w-0'>

            <h1 className='font-bold text-lg sm:text-xl'>
              Payment Details
            </h1>

            <p className='text-sm sm:text-base text-[#435047] mt-1'>
              Fill in your details to withdraw your earnings.
            </p>


            <form className='mt-6 sm:mt-8 space-y-4'>

              {/* ================= NAME + EMAIL ================= */}

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>

                <div className='w-full'>
                  <label className='block mb-2 font-medium text-sm sm:text-base'>
                    Full Name:
                  </label>

                  <input
                    type='text'
                    placeholder='e.g Emeka Okafor'
                    className='border border-slate-300 shadow-sm w-full rounded-md px-3 py-3 outline-none focus:border-[#2d5e48] focus:ring-1 focus:ring-[#2d5e48]'
                  />
                </div>


                <div className='w-full'>
                  <label className='block mb-2 font-medium text-sm sm:text-base'>
                    Email address:
                  </label>

                  <input
                    type='email'
                    placeholder='e.g emeka@gmail.com'
                    className='border border-slate-300 shadow-sm w-full rounded-md px-3 py-3 outline-none focus:border-[#2d5e48] focus:ring-1 focus:ring-[#2d5e48]'
                  />
                </div>

              </div>


              {/* ================= BANK + ACCOUNT NAME ================= */}

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>

                <div className='w-full'>
                  <label className='block mb-2 font-medium text-sm sm:text-base'>
                    Bank Name:
                  </label>

                  <input
                    type='text'
                    placeholder='e.g Zenith Bank'
                    className='border border-slate-300 shadow-sm w-full rounded-md px-3 py-3 outline-none focus:border-[#2d5e48] focus:ring-1 focus:ring-[#2d5e48]'
                  />
                </div>


                <div className='w-full'>
                  <label className='block mb-2 font-medium text-sm sm:text-base'>
                    Account Name:
                  </label>

                  <input
                    type='text'
                    placeholder='e.g Emeka Okafor'
                    className='border border-slate-300 shadow-sm w-full rounded-md px-3 py-3 outline-none focus:border-[#2d5e48] focus:ring-1 focus:ring-[#2d5e48]'
                  />
                </div>

              </div>


              {/* ================= ACCOUNT NUMBER + AMOUNT ================= */}

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>

                <div className='w-full'>
                  <label className='block mb-2 font-medium text-sm sm:text-base'>
                    Account Number:
                  </label>

                  <input
                    type='number'
                    placeholder='e.g 1234567898'
                    className='border border-slate-300 shadow-sm w-full rounded-md px-3 py-3 outline-none focus:border-[#2d5e48] focus:ring-1 focus:ring-[#2d5e48]'
                  />
                </div>


                <div className='w-full'>
                  <label className='block mb-2 font-medium text-sm sm:text-base'>
                    Amount to Withdraw (₦):
                  </label>

                  <input
                    type='number'
                    placeholder='Enter amount'
                    className='border border-slate-300 shadow-sm w-full rounded-md px-3 py-3 outline-none focus:border-[#2d5e48] focus:ring-1 focus:ring-[#2d5e48]'
                  />
                </div>

              </div>


              {/* ================= WITHDRAW BUTTON ================= */}

              <div className='pt-2'>

                <button
                  type='submit'
                  className='w-full sm:w-auto font-medium bg-amber-500 px-5 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-amber-600 active:scale-95'
                >
                  Request Withdrawal
                </button>

              </div>

            </form>

          </section>


          {/* ================= INFORMATION PANEL ================= */}

          <section className='hidden lg:block bg-[#E4EEE7] p-4 rounded-lg h-fit'>

            {/* How withdrawals work */}

            <div className='mb-4'>

              <div className='flex gap-3 items-center mb-3'>

                <BiInfoCircle className='text-green-700 text-xl shrink-0' />

                <h2 className='font-medium'>
                  How withdrawals work
                </h2>

              </div>


              <div className='ml-3 space-y-2 text-sm'>

                <div className='flex gap-3'>
                  <p>✓</p>
                  <p>
                    Requests are reviewed by the admin.
                  </p>
                </div>

                <div className='flex gap-3'>
                  <p>✓</p>
                  <p>
                    Approved payments are sent to your bank account.
                  </p>
                </div>

                <div className='flex gap-3'>
                  <p>✓</p>
                  <p>
                    It may take 1-3 business days to reflect in your account.
                  </p>
                </div>

              </div>

            </div>


            <div className='border-b border-gray-300'></div>


            {/* Important */}

            <div className='mt-4'>

              <div className='flex gap-3 items-center mb-3'>

                <MdOutlineGppGood className='text-green-700 text-xl shrink-0' />

                <h2 className='font-medium'>
                  Important
                </h2>

              </div>


              <div className='ml-3 space-y-2 text-sm'>

                <div className='flex gap-3'>
                  <p>✓</p>
                  <p>
                    Ensure your bank details are correct before submitting a request.
                  </p>
                </div>

                <div className='flex gap-3'>
                  <p>✓</p>
                  <p>
                    You can only request a withdrawal when you have a balance available.
                  </p>
                </div>

              </div>

            </div>

          </section>

        </section>


        {/* ================= SECURITY MESSAGE ================= */}

        <div className='bg-green-100 text-green-800 mt-4 p-3 rounded-md flex items-start sm:items-center gap-2'>

          <MdLockOutline className='text-green-800 font-bold text-xl shrink-0 mt-0.5 sm:mt-0' />

          <p className='text-sm sm:text-base'>
            Your earnings are secure with us. We will never share your payment details.
          </p>

        </div>

      </section>

    </main>
  )
}
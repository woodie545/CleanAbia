import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <section className='bg-[#E4EEE7] grid md:grid-cols-2 overflow-y-hidden'>
            <div className='bg-[#123A28] text-white px-8 md:px-20 py-6 md:flex flex-col hidden'>
                <div className='flex items-center'>
                    <img src="./CleanAbialogo.png" alt="CleanAbiaLogo" className=' w-12 h-12' />
                    <h2 className='font-semibold text-2xl '>CleanAbia</h2>
                </div>
                <div className='mt-20 md:mt-20 max-w-md '>
                    <h1 className='font-semibold text-4xl md:text-5xl p-2 leading-tight'>Welcome back to the loop.</h1>
                    <p className='text-lg text-gray-300 leading-relaxed mt-6'>Log in to file a report, check a job offer, or track your payout.</p>
                </div>
                <div className='mt-auto pt-10 text-gray-400'>Umuahia, Abia State. cleanAbia.ng

                </div>
            </div>

            <div className='w-full px-8 md:px-16 py-6'>
                <h1 className='text-3xl md:text-4xl font-medium text-gray-900 p-2'>Log In</h1>
                <p className='mt-4 text-lg text-gray-600 leading-relaxed'>Reporter, Agent and Admin accounts all log in here - you'll land on the right dashboard automatically. </p>
                <form action="" className='mt-10'>
                    <div>
                        <label htmlFor="" className='block text-base font-semibold text-gray-900 mb-2'>Email address</label>
                        <input type="email" placeholder='Enter your Email Address' className='p-2 pl-3 w-full h-10 rounded-xl border border-gray-300 bg-white text-lg outline-none' />
                    </div>

                    <div className='mt-7 h-10 rounded-2xl'>
                        <label htmlFor="" className='block text-base font-semibold text-gray-900 mb-2'>Password</label>
                        <input type="password" placeholder='***********' className='p-2 pl-3 w-full h-10 rounded-xl border border-gray-300 bg-white text-lg outline-none' />
                    </div>
                    <div className='text-right mb-8  mt-7'>
                        <Link to="/forgotpassword" className='text-green-600 hover:underline'>Forgot Password</Link>
                    </div>

                    <button className='bg-green-900 rounded-2xl text-white w-full h-10 mt-10 '>Log in</button>
                </form>


                <p className='text-center mt-8 text-lg text-gray-600'>New to Clean Abia?{" "}
                    <Link to="/signup" className='font-bold hover:underline text-[#126247]'>Signup</Link>
                </p>
                <Link />
            </div>
        </section>
    )
}
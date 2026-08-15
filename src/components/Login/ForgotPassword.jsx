import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    return (
        <section className='bg-gray-200 min-h-screen text-black   flex items-center justify-center p-6'>
            <div className='  bg-[#E4EEE7] p-8 rounded-lg w-full max-w-md border border-gray-400'>
                <h2 className='text-2xl flex  items-center'>Forgot Password?</h2>
                <p>Enter your Email, and we will help you reset your password</p>

                <form action="">
                    <label htmlFor="email" className='text-lg font-semibold block mb-2'>Email address: </label>
                    <input id='email' type="email" className='border-2 border-gray-300 py-3 px-4 rounded-md w-full mb-5' placeholder='Enter your Email' />
                    <button type='submit' className='bg-gray-900 text-white py-3 rounded-md w-full hover:bg-green-500'>Reset Password</button>
                </form>
                <p className="text-center mt-5"> Remember your password?{" "}
                    <Link to="/login" className="text-green-600 font-bold hover:underline" > Login </Link>
                </p>

            </div>
        </section>
    )
}

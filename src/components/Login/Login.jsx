import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../services/auth'
import { getMyProfile } from '../../services/profiles'
import { ROLE_HOME } from '../ProtectedRoute'

export default function LoginSection() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        setErrorMsg('')
        setLoading(true)

        try {
            await signIn(email, password)

            // Look up the role so we can send the person to
            // the right dashboard (reporter / agent / admin).
            const profile = await getMyProfile()
            navigate(ROLE_HOME[profile?.role] ?? '/agentdashboard')
        } catch (error) {
            setErrorMsg(error.message || 'Failed to log in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='bg-[#E4EEE7] grid md:grid-cols-2 min-h-screen overflow-y-hidden'>
            {/* Left Panel - Hero */}
            <div className='bg-[#123A28] text-white px-8 md:px-20 py-6 md:flex flex-col hidden'>
                <div className='flex items-center gap-2'>
                    <img src="/MAIN LOGO 2.png" alt="CleanAbiaLogo" className='w-12 h-12' />
                    <h2 className='font-semibold text-2xl'>CleanAbia</h2>
                </div>
                <div className='mt-20 max-w-md'>
                    <h1 className='font-semibold text-4xl md:text-5xl p-2 leading-tight'>
                        Welcome back to the loop.
                    </h1>
                    <p className='text-lg text-gray-300 leading-relaxed mt-6'>
                        Log in to file a report, check a job offer, or track your payout.
                    </p>
                </div>
                <div className='mt-auto pt-10 text-gray-400'>
                    Umuahia, Abia State. cleanAbia.ng
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className='w-full px-8 md:px-16 py-6 flex flex-col justify-center'>
                <h1 className='text-3xl md:text-4xl font-medium text-gray-900 p-2'>Log In</h1>
                <p className='mt-4 text-lg text-gray-600 leading-relaxed'>
                    Reporter, Agent and Admin accounts all log in here - you'll land on the right dashboard automatically.
                </p>

                {errorMsg && (
                    <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm'>
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className='mt-8'>
                    <div>
                        <label className='block text-base font-semibold text-gray-900 mb-2'>
                            Email address
                        </label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your Email Address' 
                            className='p-2 pl-3 w-full h-10 rounded-xl border border-gray-300 bg-white text-lg outline-none focus:ring-2 focus:ring-[#123A28]' 
                        />
                    </div>

                    <div className='mt-6'>
                        <label className='block text-base font-semibold text-gray-900 mb-2'>
                            Password
                        </label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='***********' 
                            className='p-2 pl-3 w-full h-10 rounded-xl border border-gray-300 bg-white text-lg outline-none focus:ring-2 focus:ring-[#123A28]' 
                        />
                    </div>

                    <div className='text-right my-4'>
                        <Link to="/forgotpassword" className='text-green-600 hover:underline text-sm font-medium'>
                            Forgot Password?
                        </Link>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className='bg-[#123A28] disabled:bg-gray-400 hover:bg-[#0e2d1f] transition-colors rounded-2xl text-white w-full h-10 font-medium'
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

                <p className='text-center mt-8 text-lg text-gray-600'>
                    New to Clean Abia?{" "}
                    <Link to="/signup" className='font-bold hover:underline text-[#126247]'>
                        Signup
                    </Link>
                </p>
            </div>
        </section>
    )
}

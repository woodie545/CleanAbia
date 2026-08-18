import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from '../../services/auth'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage({ type: '', text: '' })
        setLoading(true)

        try {
            await resetPassword(email)
            setMessage({
                type: 'success',
                text: "If an account exists for that email, we've sent a password reset link.",
            })
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.message || 'Something went wrong. Please try again.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='bg-gray-200 min-h-screen text-black flex items-center justify-center p-6'>
            <div className='bg-[#E4EEE7] p-8 rounded-lg w-full max-w-md border border-gray-400'>
                <h2 className='text-2xl flex items-center'>Forgot Password?</h2>
                <p>Enter your Email, and we will help you reset your password</p>

                {message.text && (
                    <div
                        className={`mt-4 p-3 rounded-md text-sm ${
                            message.type === 'error'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-800'
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className='text-lg font-semibold block mb-2 mt-5'>Email address: </label>
                    <input
                        id='email'
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-2 border-gray-300 py-3 px-4 rounded-md w-full mb-5'
                        placeholder='Enter your Email'
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-gray-900 disabled:bg-gray-500 text-white py-3 rounded-md w-full hover:bg-green-500 transition-colors'
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>
                <p className="text-center mt-5"> Remember your password?{" "}
                    <Link to="/login" className="text-green-600 font-bold hover:underline"> Login </Link>
                </p>

            </div>
        </section>
    )
}

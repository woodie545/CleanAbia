import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { signUp } from '../../services/auth'
import { updateMyProfile } from '../../services/profiles'
import Terms from '../agentsignup/terms'

export default function SignReporter({ setPage }) {
  const [page, setLocalPage] = useState('signup')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    if (!agreedToTerms) {
      setErrorMsg("Please agree to CleanAbia's Terms to continue.")
      return
    }

    setLoading(true)

    try {
      const data = await signUp({
        email,
        password,
        fullName,
      })

      // If email confirmation is off, signUp returns an active
      // session immediately, so we can fill in the rest of the
      // profile right away. If confirmation is required, there's
      // no session yet - the person completes this after they
      // verify their email and log in.
      if (data?.session) {
        try {
          await updateMyProfile({ phone, location })
        } catch (profileErr) {
          console.error('Failed to save extra profile fields:', profileErr)
        }

        navigate('/login')
        return
      }

      setSuccessMsg(
        "Account created! Check your email to confirm your address, then log in."
      )
    } catch (error) {
      setErrorMsg(error.message || 'Failed to create your account.')
    } finally {
      setLoading(false)
    }
  }

  if (page === 'terms') {
    return <Terms setPage={setLocalPage} />
  }

  return (
    <section className='bg-[#E4EEE7] min-h-screen py-10 px-4 sm:px-8'>
      <div className='max-w-lg mx-auto'>
        <button
          type='button'
          onClick={() => setPage?.('userRoles')}
          className='py-1.5 border-2 border-gray-400 px-3 mb-6 flex items-center gap-2 rounded-md text-sm font-medium hover:bg-white transition-colors'
        >
          <FaArrowLeftLong /> Back
        </button>

        <h1 className='text-2xl sm:text-3xl font-semibold text-[#123A28]'>
          Create your Reporter account
        </h1>
        <p className='text-gray-600 mt-2'>
          Report a dirty site in under a minute and start earning points.
        </p>

        {errorMsg && (
          <div className='mt-5 p-3 bg-red-100 text-red-700 rounded-xl text-sm'>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className='mt-5 p-3 bg-green-100 text-green-800 rounded-xl text-sm'>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-5 mt-6'>
          <div>
            <label htmlFor='fullName' className='block font-medium text-sm mb-1.5'>
              Full Name
            </label>
            <input
              id='fullName'
              type='text'
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='e.g Chidinma Okafor'
              className='w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#123A28]'
            />
          </div>

          <div>
            <label htmlFor='email' className='block font-medium text-sm mb-1.5'>
              Email address
            </label>
            <input
              id='email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@email.com'
              className='w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#123A28]'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label htmlFor='phone' className='block font-medium text-sm mb-1.5'>
                Phone number
              </label>
              <input
                id='phone'
                type='text'
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='+234 xxx xxx'
                className='w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#123A28]'
              />
            </div>

            <div>
              <label htmlFor='location' className='block font-medium text-sm mb-1.5'>
                Location / LGA
              </label>
              <input
                id='location'
                type='text'
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='e.g Aba South'
                className='w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#123A28]'
              />
            </div>
          </div>

          <div className='relative'>
            <label htmlFor='password' className='block font-medium text-sm mb-1.5'>
              Create password
            </label>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#123A28]'
            />
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-3 top-9 text-gray-500'
              aria-label='Toggle password visibility'
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div>
            <label htmlFor='confirmPassword' className='block font-medium text-sm mb-1.5'>
              Confirm password
            </label>
            <input
              id='confirmPassword'
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#123A28]'
            />
          </div>

          <div className='flex items-start gap-2 pt-1'>
            <input
              id='terms'
              type='checkbox'
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className='mt-1'
            />
            <label htmlFor='terms' className='text-sm text-gray-700'>
              I agree to CleanAbia's{' '}
              <button
                type='button'
                onClick={() => setLocalPage('terms')}
                className='text-green-700 font-medium hover:underline'
              >
                Terms
              </button>
            </label>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-[#123A28] disabled:bg-gray-400 hover:bg-[#0e2d1f] transition-colors text-white py-3 rounded-2xl font-medium'
          >
            {loading ? 'Creating account...' : 'Create Reporter account'}
          </button>
        </form>
      </div>
    </section>
  )
}

import React, { useState, useEffect } from 'react'
import { FiPhone } from 'react-icons/fi'
import { IoIdCardOutline, IoLocationOutline } from 'react-icons/io5'
import { MdOutlineEmail } from 'react-icons/md'

export default function Profile({ profile, setProfile }) {
  // Controls edit mode
  const [isEditing, setIsEditing] = useState(false)

  // Initialize temporary form data with profile prop
  const [formData, setFormData] = useState(profile)

  // Keep form data synchronized if the profile prop changes externally
  useEffect(() => {
    setFormData(profile)
  }, [profile])

  // Extract initials dynamically from name
  const getInitials = (name) => {
    if (!name) return 'EO'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return parts[0][0]?.toUpperCase() || 'EO'
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Save the changes back to parent state
  const handleSave = () => {
    setProfile(formData) // Updates state in Agents.jsx -> syncs Aside & Abiaproj
    setIsEditing(false)
  }

  // Cancel editing
  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  return (
    <div className='bg-[#E4EEE7] min-h-screen w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-25 pt-6 sm:pt-8 pb-10 overflow-x-hidden'>
      {/* Page heading */}
      <h1 className='text-xl sm:text-2xl font-bold text-[#123A28]'>
        Agent Profile
      </h1>

      <p className='text-sm sm:text-base text-[#5B6B60] mt-1'>
        Manage your personal information and account settings.
      </p>

      {/* PROFILE CARD */}
      <section className='mt-5 bg-white px-4 sm:px-6 md:px-8 pt-4 sm:pt-5 rounded-2xl pb-8 sm:pb-10 w-full max-w-4xl shadow-sm'>
        <p className='text-base sm:text-lg font-bold text-[#123A28]'>
          Personal information
        </p>

        {/* PROFILE HEADER */}
        <div className='flex flex-col items-center mb-6 mt-5'>
          {profile?.image ? (
            <img
              src={profile.image}
              alt={profile?.name}
              className='w-20 h-20 rounded-full object-cover mb-4'
            />
          ) : (
            <div className='bg-[#123A28] text-white p-5 rounded-full text-center w-20 h-20 flex items-center justify-center mb-4 font-bold text-xl'>
              {getInitials(profile?.name)}
            </div>
          )}

          <p className='text-lg sm:text-xl font-bold mb-2 text-center text-gray-800 break-words'>
            {profile?.name}
          </p>

          <div className='flex gap-2'>
            <p className='bg-green-100 text-green-800 rounded-full font-medium px-3 py-1.5 text-xs sm:text-sm'>
              Verified Agent
            </p>
          </div>
        </div>

        {/* VIEW PROFILE MODE */}
        {!isEditing && (
          <>
            <div className='space-y-4 sm:space-y-5'>
              {/* Agent ID */}
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-100 pb-4'>
                <div className='flex gap-3 text-gray-500 items-center'>
                  <IoIdCardOutline className='text-xl text-[#123A28] shrink-0' />
                  <p>Agent ID</p>
                </div>
                <p className='font-medium text-sm sm:text-base text-[#123A28] break-all sm:text-right'>
                  AGT-2024-00158
                </p>
              </div>

              {/* Phone */}
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-100 pb-4'>
                <div className='flex gap-3 text-gray-500 items-center'>
                  <FiPhone className='text-xl text-[#123A28] shrink-0' />
                  <p>Phone</p>
                </div>
                <p className='font-medium text-sm sm:text-base text-[#123A28] break-all sm:text-right'>
                  {profile?.phone}
                </p>
              </div>

              {/* Email */}
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-100 pb-4'>
                <div className='flex gap-3 text-gray-500 items-center'>
                  <MdOutlineEmail className='text-xl text-[#123A28] shrink-0' />
                  <p>Email</p>
                </div>
                <p className='font-medium text-sm sm:text-base text-[#123A28] break-all sm:text-right'>
                  {profile?.email}
                </p>
              </div>

              {/* Location */}
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
                <div className='flex gap-3 items-center text-gray-500'>
                  <IoLocationOutline className='text-xl text-[#123A28] shrink-0' />
                  <p>Location</p>
                </div>
                <p className='font-medium text-sm sm:text-base text-[#123A28] sm:text-right break-words'>
                  {profile?.location}
                </p>
              </div>
            </div>

            {/* Edit button */}
            <div className='border-2 border-[#123A28] text-[#123A28] py-2.5 rounded-xl text-center mt-7 hover:bg-[#123A28] hover:text-white transition-colors'>
              <button
                onClick={() => setIsEditing(true)}
                className='font-bold w-full'
              >
                Edit profile
              </button>
            </div>
          </>
        )}

        {/* EDIT PROFILE MODE */}
        {isEditing && (
          <div className='space-y-4 sm:space-y-5 mt-6'>
            {/* Name */}
            <div>
              <label className='block font-medium mb-2 text-sm sm:text-base text-gray-700'>
                Full Name
              </label>
              <input
                type='text'
                name='name'
                value={formData?.name || ''}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-3 text-sm sm:text-base outline-none focus:border-[#123A28] focus:ring-1 focus:ring-[#123A28]'
              />
            </div>

            {/* Phone */}
            <div>
              <label className='block font-medium mb-2 text-sm sm:text-base text-gray-700'>
                Phone
              </label>
              <input
                type='tel'
                name='phone'
                value={formData?.phone || ''}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-3 text-sm sm:text-base outline-none focus:border-[#123A28] focus:ring-1 focus:ring-[#123A28]'
              />
            </div>

            {/* Email */}
            <div>
              <label className='block font-medium mb-2 text-sm sm:text-base text-gray-700'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData?.email || ''}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-3 text-sm sm:text-base outline-none focus:border-[#123A28] focus:ring-1 focus:ring-[#123A28]'
              />
            </div>

            {/* Location */}
            <div>
              <label className='block font-medium mb-2 text-sm sm:text-base text-gray-700'>
                Location
              </label>
              <input
                type='text'
                name='location'
                value={formData?.location || ''}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-3 text-sm sm:text-base outline-none focus:border-[#123A28] focus:ring-1 focus:ring-[#123A28]'
              />
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 pt-3'>
              <button
                onClick={handleCancel}
                className='w-full sm:flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition'
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className='w-full sm:flex-1 bg-[#123A28] text-white py-3 rounded-xl font-bold hover:bg-[#1E5B3E] transition'
              >
                Save changes
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
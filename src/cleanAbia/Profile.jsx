import React, { useState, useEffect, useRef } from 'react'
import { FiPhone } from 'react-icons/fi'
import { IoIdCardOutline, IoLocationOutline, IoCameraOutline } from 'react-icons/io5'
import { MdOutlineEmail } from 'react-icons/md'
import { useAuth } from '../hooks/useAuth'
import { updateMyProfile, uploadAvatar } from '../services/profiles'
import { getMyAgentProfile } from '../services/agentProfiles'

// Field names below match the `profiles` table (full_name, phone,
// location, avatar_url). Agent-specific info (agent_code,
// verification) comes from `agent_profiles` separately.
export default function Profile() {
  const { user, profile, refreshProfile } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile || {})
  const [agentProfile, setAgentProfile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const fileInputRef = useRef(null)

  useEffect(() => {
    setFormData(profile || {})
  }, [profile])

  useEffect(() => {
    getMyAgentProfile()
      .then(setAgentProfile)
      .catch((err) => console.error('Failed to load agent profile:', err))
  }, [])

  const getInitials = (name) => {
    if (!name) return 'EO'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return parts[0][0]?.toUpperCase() || 'EO'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingAvatar(true)
    setMessage({ type: '', text: '' })

    try {
      await uploadAvatar(file)
      await refreshProfile()
      setMessage({ type: 'success', text: 'Profile photo updated.' })
    } catch (err) {
      console.error('Failed to upload avatar:', err)
      setMessage({ type: 'error', text: err.message || 'Failed to upload photo.' })
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      await updateMyProfile({
        full_name: formData.full_name,
        phone: formData.phone,
        location: formData.location,
      })
      await refreshProfile()
      setIsEditing(false)
      setMessage({ type: 'success', text: 'Profile updated.' })
    } catch (err) {
      console.error('Failed to save profile:', err)
      setMessage({ type: 'error', text: err.message || 'Failed to save changes.' })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData(profile || {})
    setIsEditing(false)
  }

  return (
    <div className='bg-[#E4EEE7] min-h-screen w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-25 pt-6 sm:pt-8 pb-10 overflow-x-hidden'>
      <h1 className='text-xl sm:text-2xl font-bold text-[#123A28]'>
        Agent Profile
      </h1>

      <p className='text-sm sm:text-base text-[#5B6B60] mt-1'>
        Manage your personal information and account settings.
      </p>

      {message.text && (
        <div
          className={`mt-4 max-w-4xl p-3 rounded-xl text-sm ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <section className='mt-5 bg-white px-4 sm:px-6 md:px-8 pt-4 sm:pt-5 rounded-2xl pb-8 sm:pb-10 w-full max-w-4xl shadow-sm'>
        <p className='text-base sm:text-lg font-bold text-[#123A28]'>
          Personal information
        </p>

        {/* PROFILE HEADER */}
        <div className='flex flex-col items-center mb-6 mt-5'>
          <div className='relative'>
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile?.full_name}
                className='w-20 h-20 rounded-full object-cover mb-4'
              />
            ) : (
              <div className='bg-[#123A28] text-white p-5 rounded-full text-center w-20 h-20 flex items-center justify-center mb-4 font-bold text-xl'>
                {getInitials(profile?.full_name)}
              </div>
            )}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept='image/*'
              className='hidden'
            />
            <button
              type='button'
              onClick={handleAvatarClick}
              disabled={uploadingAvatar}
              className='absolute bottom-3 right-0 bg-[#123A28] text-white p-1.5 rounded-full shadow disabled:opacity-60'
              title='Upload photo'
            >
              <IoCameraOutline />
            </button>
          </div>

          <p className='text-lg sm:text-xl font-bold mb-2 text-center text-gray-800 break-words'>
            {profile?.full_name}
          </p>

          <div className='flex gap-2'>
            <p
              className={`rounded-full font-medium px-3 py-1.5 text-xs sm:text-sm ${
                agentProfile?.is_verified
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {agentProfile?.is_verified ? 'Verified Agent' : 'Verification pending'}
            </p>
          </div>
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <>
            <div className='space-y-4 sm:space-y-5'>
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-100 pb-4'>
                <div className='flex gap-3 text-gray-500 items-center'>
                  <IoIdCardOutline className='text-xl text-[#123A28] shrink-0' />
                  <p>Agent ID</p>
                </div>
                <p className='font-medium text-sm sm:text-base text-[#123A28] break-all sm:text-right'>
                  {agentProfile?.agent_code || 'Pending assignment'}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-100 pb-4'>
                <div className='flex gap-3 text-gray-500 items-center'>
                  <FiPhone className='text-xl text-[#123A28] shrink-0' />
                  <p>Phone</p>
                </div>
                <p className='font-medium text-sm sm:text-base text-[#123A28] break-all sm:text-right'>
                  {profile?.phone || 'Not set'}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-100 pb-4'>
                <div className='flex gap-3 text-gray-500 items-center'>
                  <MdOutlineEmail className='text-xl text-[#123A28] shrink-0' />
                  <p>Email</p>
                </div>
                <p className='font-medium text-sm sm:text-base text-[#123A28] break-all sm:text-right'>
                  {user?.email}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
                <div className='flex gap-3 items-center text-gray-500'>
                  <IoLocationOutline className='text-xl text-[#123A28] shrink-0' />
                  <p>Location</p>
                </div>
                <p className='font-medium text-sm sm:text-base text-[#123A28] sm:text-right break-words'>
                  {profile?.location || 'Not set'}
                </p>
              </div>
            </div>

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

        {/* EDIT MODE */}
        {isEditing && (
          <div className='space-y-4 sm:space-y-5 mt-6'>
            <div>
              <label className='block font-medium mb-2 text-sm sm:text-base text-gray-700'>
                Full Name
              </label>
              <input
                type='text'
                name='full_name'
                value={formData?.full_name || ''}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-3 text-sm sm:text-base outline-none focus:border-[#123A28] focus:ring-1 focus:ring-[#123A28]'
              />
            </div>

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

            <div className='flex flex-col sm:flex-row gap-3 pt-3'>
              <button
                onClick={handleCancel}
                className='w-full sm:flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition'
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className='w-full sm:flex-1 bg-[#123A28] disabled:opacity-60 text-white py-3 rounded-xl font-bold hover:bg-[#1E5B3E] transition'
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

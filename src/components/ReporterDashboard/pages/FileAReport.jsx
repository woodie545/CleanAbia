import React, { useState } from 'react'
import { GoLocation } from 'react-icons/go'
import { LuLoaderCircle } from 'react-icons/lu'
import {
  createReport,
  uploadReportImage,
} from '../../../services/reports'

const CATEGORIES = [
  { value: 'overflowing_bin', label: 'Overflowing bin' },
  { value: 'illegal_dumping', label: 'Illegal dumping' },
  { value: 'blocked_drainage', label: 'Blocked drainage' },
  { value: 'drainage_clearance', label: 'Drainage clearance' },
  { value: 'waste_collection', label: 'Waste collection' },
  { value: 'other', label: 'Other' },
]

const MAX_IMAGES = 4

export default function FileAReport({ setPages }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('overflowing_bin')
  const [address, setAddress] = useState('')
  const [lga, setLga] = useState('')
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [locating, setLocating] = useState(false)

  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setMessage({
        type: 'error',
        text: 'Location services are not available on this device.',
      })
      return
    }

    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setLocating(false)
      },
      () => {
        setMessage({
          type: 'error',
          text: 'Could not get your location. You can still submit without it.',
        })
        setLocating(false)
      }
    )
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files || []).slice(
      0,
      MAX_IMAGES - images.length
    )

    if (files.length === 0) return

    setImages((prev) => [...prev, ...files])
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ])
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!title.trim() || !address.trim()) {
      setMessage({
        type: 'error',
        text: 'Please fill in a title and address before submitting.',
      })
      return
    }

    setSubmitting(true)

    try {
      const report = await createReport({
        title,
        description,
        category,
        address,
        lga,
        latitude,
        longitude,
      })

      // Upload images one at a time so a single failed upload
      // doesn't block the ones that already succeeded.
      for (const image of images) {
        try {
          await uploadReportImage(report.id, image)
        } catch (imageErr) {
          console.error('Failed to upload one of the report images:', imageErr)
        }
      }

      setMessage({
        type: 'success',
        text: 'Report submitted! Thanks for helping keep Abia clean.',
      })

      setTitle('')
      setDescription('')
      setCategory('overflowing_bin')
      setAddress('')
      setLga('')
      setLatitude(null)
      setLongitude(null)
      setImages([])
      setImagePreviews([])

      // Send them back to the overview so they can see it listed.
      setPages?.('overview')
    } catch (err) {
      console.error('Failed to submit report:', err)
      setMessage({
        type: 'error',
        text: err.message || 'Failed to submit report. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className='flex-1 p-4 md:p-8 min-w-0 overflow-x-hidden bg-forest-tint'>
      <div className='mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold text-black'>
          File a Report
        </h1>
        <p className='text-gray-600 text-sm md:text-base'>
          Seen a dirty site? Report it in under a minute.
        </p>
      </div>

      {message.text && (
        <div
          className={`mb-5 p-3 rounded-lg text-sm max-w-2xl ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-lg p-6 shadow-sm space-y-5 max-w-2xl'
      >
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
            Title
          </label>
          <input
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g Overflowing bin at Ogbor Hill Rd'
            className='w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest'
          />
        </div>

        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest'
          >
            {CATEGORIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Anything the clean-up agent should know?'
            className='w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest'
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
              Address
            </label>
            <input
              type='text'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Street / landmark'
              className='w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
              LGA
            </label>
            <input
              type='text'
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              placeholder='e.g Aba South'
              className='w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest'
            />
          </div>
        </div>

        <div>
          <button
            type='button'
            onClick={handleUseMyLocation}
            disabled={locating}
            className='flex items-center gap-2 text-sm font-semibold text-forest hover:underline disabled:opacity-60'
          >
            {locating ? (
              <LuLoaderCircle className='animate-spin' />
            ) : (
              <GoLocation />
            )}
            {latitude && longitude
              ? 'Location attached'
              : 'Attach my current location'}
          </button>
          {latitude && longitude && (
            <p className='text-xs text-gray-500 mt-1'>
              {latitude.toFixed(5)}, {longitude.toFixed(5)}
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
            Photos (up to {MAX_IMAGES})
          </label>

          {imagePreviews.length > 0 && (
            <div className='flex flex-wrap gap-3 mb-3'>
              {imagePreviews.map((src, index) => (
                <div key={src} className='relative w-20 h-20'>
                  <img
                    src={src}
                    alt={`Report photo ${index + 1}`}
                    className='w-20 h-20 object-cover rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => removeImage(index)}
                    className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center'
                    aria-label='Remove photo'
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length < MAX_IMAGES && (
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={handleImageChange}
              className='text-sm'
            />
          )}
        </div>

        <button
          type='submit'
          disabled={submitting}
          className='w-full sm:w-auto bg-forest disabled:bg-gray-300 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity'
        >
          {submitting ? 'Submitting...' : 'Submit report'}
        </button>
      </form>
    </main>
  )
}

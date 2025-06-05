'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ContactBlock as props } from '@/payload-types'
import { getImageUrl } from '@/utilities/functon'

const ContactBlock: React.FC<props> = ({ title, description, submitButtonLabel, contactInfo }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    mobile: '',
    company: '',
    message: '',
  })

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to send email.')

      setFormSubmitted(true)
      setFormData({ firstName: '', email: '', mobile: '', company: '', message: '' })
    } catch (err) {
      console.error('Error while sending email:', err)
      setError('An error occurred while sending your message.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      id="contact"
      className="contact-us section py-20 bg-gradient-to-br from-gray-950 to-gray-900 text-black"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 text-white">
          <h6 className="text-lg ">{description}</h6>
          <h4 className="text-3xl font-bold mb-2">
            {title} <em className="text-purple-500 not-italic">Now</em>
          </h4>
          <div className="w-24 h-1 bg-purple-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="w-full h-[636px] overflow-hidden rounded-xl">
              <iframe
                src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+mahdia+-+RJ,+Tunisia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-white">
              {contactInfo?.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <Image
                      src={getImageUrl(item?.icon, '')}
                      alt="photo contact "
                      className="w-12 h-12"
                    />

                    <Link
                      href={item.link}
                      className="text-lg font-semibold text-white hover:text-purple-400 transition"
                    >
                      {item.label}
                    </Link>
                    <div className="w-8 h-1 bg-purple-500 rounded-full mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
              {formSubmitted ? (
                <p className="text-green-600 text-xl font-semibold text-center">
                  ✅ Thank you for your message! We&apos;ll get back to you soon.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="p-4 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      pattern="[^ @]*@[^ @]*"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="p-4 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Phone"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="p-4 rounded-md border border-gray-300 w-full"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="p-4 rounded-md border border-gray-300 w-full"
                    />
                  </div>

                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-md"
                    rows={6}
                  ></textarea>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-all duration-300"
                    >
                      {loading ? 'Sending...' : submitButtonLabel}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactBlock

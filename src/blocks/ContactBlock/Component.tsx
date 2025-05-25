'use client'

import React, { useState } from 'react'
interface ContactBlockProps {
  title: string
  description: string
  submitButtonLabel: string
}

const ContactBlock: React.FC<ContactBlockProps> = ({ title, description, submitButtonLabel }) => {
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
        headers: {
          'Content-Type': 'application/json',
        },
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
    <section className="py-20 bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h2>
          <p className="text-lg md:text-xl text-gray-400">{description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Google Map */}
          {/* <GoogleMap /> */}

          {/* Contact Form */}
          <div className="flex-1 bg-black rounded-2xl shadow-2xl p-10">
            {formSubmitted ? (
              <p className="text-green-400 text-center text-xl font-semibold">
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
                    className="bg-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Phone"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : submitButtonLabel}
                </button>

                {error && <p className="text-red-400 text-center">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactBlock

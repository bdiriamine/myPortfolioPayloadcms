'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import RichText from '@/components/RichText'
import { getImageUrl } from '@/utilities/functon'
import { Internship as InternshipsProps, Media } from '@/payload-types'
import Image from 'next/image'
interface AttestationFile {
  url: string
  filename: string
}

interface Internship {
  id: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  description?: any
  supervisor?: string
  supervisorContact?: string
  InternshipsImage: string | Media
  attestation?: AttestationFile | string
}

const InternshipsBlock: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/internships`)
        const data = await res.json()
        setInternships(data.docs)
      } catch (error) {
        console.error('Failed to fetch internships:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-white bg-zinc-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          <Briefcase />
        </motion.div>
        <p className="mt-4 text-lg font-medium animate-pulse">Loading internship experiences...</p>
      </div>
    )
  }

  if (internships.length === 0) {
    return <p className="text-center text-gray-400">No internships found.</p>
  }

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 py-16 bg-zinc-950">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
        💼 My <span className="text-purple-500">Internship Experiences</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {internships.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl text-white overflow-hidden group"
          >
            <div className="absolute rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 blur-sm opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
            <p className="text-sm text-gray-300 mt-1 relative z-10">
              {item.company} {item.location && `• ${item.location}`}
            </p>
            <p className="text-sm text-gray-300 mt-1 relative z-10">
              {new Date(item.startDate).toLocaleDateString()} –{' '}
              {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Present'}
            </p>
            {item?.InternshipsImage && (
              <div className="flex justify-center my-4 relative z-10">
                <Image
                  src={getImageUrl(item.InternshipsImage, '')}
                  alt={` logo of school`}
                  className=" object-contain rounded-lg shadow-md border border-white/10"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div className="mt-4 relative z-10 bg-white/10 p-4 rounded-md text-sm text-gray-100 max-h-40 overflow-auto hide-scrollbar">
              {item.description ? (
                <RichText
                  data={item.description}
                  className="prose prose-invert max-w-none text-gray-300"
                />
              ) : (
                <em>No description provided.</em>
              )}
            </div>

            {(item.supervisor || item.supervisorContact) && (
              <div className="mt-2 relative z-10 text-sm text-gray-400">
                <p>👤 {item.supervisor}</p>
                <p>📞 {item.supervisorContact}</p>
              </div>
            )}

            {item.attestation && typeof item.attestation !== 'string' && (
              <a
                href={item.attestation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-blue-300 hover:text-blue-500 underline z-10 relative"
              >
                📄 View Attestation
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default InternshipsBlock

'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Media = {
  url: string
  filename: string
}

type Certification = {
  id: string
  name: string
  issuingOrganization: string
  issueDate: string
  expirationDate?: string
  credentialID?: string
  credentialURL?: string
  certificateFile?: string | Media
}

const CertificationsBlock = () => {
  const [certifications, setCertifications] = useState<Certification[]>([])

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/certifications`)
        const data = await res.json()
        setCertifications(data.docs || [])
      } catch (error) {
        console.error('Error fetching certifications:', error)
      }
    }

    fetchCertifications()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative bg-gradient-to-br from-zinc-950 via-black to-purple-900 py-20 px-6 sm:px-12 md:px-20 text-white"
    >
      {/* Decorative Background Glow */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-700 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-2xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          🎓 My <span className="text-purple-500">Certifications</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-purple-700/40 transition-all duration-500 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold text-purple-200 mb-2">{cert.name}</h3>

              <p className="text-sm text-white/70 mb-1">
                <span className="text-white font-medium">Issued by:</span>{' '}
                {cert.issuingOrganization}
              </p>

              <p className="text-sm text-white/50 italic mb-2">
                {new Date(cert.issueDate).toLocaleDateString()} –{' '}
                {cert.expirationDate
                  ? new Date(cert.expirationDate).toLocaleDateString()
                  : 'No Expiration'}
              </p>

              {cert.credentialID && (
                <p className="text-sm text-white/70 mb-2">
                  <span className="text-white font-medium">Credential ID:</span> {cert.credentialID}
                </p>
              )}

              {cert.credentialURL && (
                <a
                  href={cert.credentialURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline text-sm block mb-2 transition-colors"
                >
                  🔗 View Credential
                </a>
              )}

              {typeof cert.certificateFile !== 'string' && cert.certificateFile?.url && (
                <a
                  href={cert.certificateFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline text-sm block transition-colors"
                >
                  📄 View Certificate ({cert.certificateFile.filename})
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default CertificationsBlock

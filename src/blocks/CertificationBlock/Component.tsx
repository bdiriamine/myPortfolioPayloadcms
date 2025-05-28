'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Certification = {
  id: string
  name: string
  issuingOrganization: string
  issueDate: string
  expirationDate?: string
  credentialID?: string
  credentialURL?: string
  certificateFile?: {
    url: string
    filename: string
  }
}

const CertificationsBlock = () => {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/certifications`)
        const data = await res.json()
        setCertifications(data.docs || [])
      } catch (error) {
        console.error('Error fetching certifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  if (loading) return <p>Loading certifications...</p>
  if (certifications.length === 0) return <p>No certifications found.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {certifications.map((cert) => (
        <div key={cert.id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-bold text-indigo-700">{cert.name}</h2>
          <p className="text-sm text-gray-600 mb-1">Issued by: {cert.issuingOrganization}</p>
          <p className="text-sm text-gray-500">
            Issue Date: {new Date(cert.issueDate).toLocaleDateString()}
          </p>
          {cert.expirationDate && (
            <p className="text-sm text-gray-500">
              Expiration: {new Date(cert.expirationDate).toLocaleDateString()}
            </p>
          )}
          {cert.credentialID && <p className="text-sm text-gray-500">ID: {cert.credentialID}</p>}
          {cert.credentialURL && (
            <a
              href={cert.credentialURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 text-sm underline"
            >
              View Credential
            </a>
          )}
          {cert.certificateFile?.url && (
            <div className="mt-3">
              <Image
                src={cert.certificateFile.url}
                alt={cert.certificateFile.filename || 'Certificate'}
                width={400}
                height={300}
                className="rounded shadow border"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CertificationsBlock

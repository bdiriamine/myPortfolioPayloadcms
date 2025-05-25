'use client'

import { Education, Media } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import RichText from '@/components/RichText'
import { getImageUrl } from '@/utilities/functon'
import Image from 'next/image'

interface DiplomaFile {
  filename: string
  url: string
}

interface EducationItem {
  id: string
  degree: string
  institution: string
  fieldOfStudy?: string
  startDate: string
  endDate?: string
  current?: boolean
  schoolImage: string | Media
  description?: any
  diplomaFile?: DiplomaFile | string
}

const EducationBlock: React.FC<Education> = () => {
  const [education, setEducation] = useState<EducationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/education`)
        const data = await res.json()
        setEducation(data.docs)
      } catch (error) {
        console.error('Failed to fetch education entries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-white bg-zinc-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          <GraduationCap />
        </motion.div>
        <p className="mt-4 text-lg font-medium animate-pulse">Loading your academic quests...</p>
      </div>
    )
  }

  if (education.length === 0) {
    return <p className="text-center text-gray-400">No education entries found.</p>
  }

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 py-16 bg-zinc-950">
      {/* 🔮 Animated Glowing Background */}
      <div className="absolute  bg-zinc-950"></div>

      {/* ✨ Floating Particles */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500 opacity-20 blur-3xl"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-blue-500 opacity-10 blur-2xl"
      />
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
        🎓 My <span className="text-purple-500"> Education Journey</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {education.map((item, index) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl text-white overflow-hidden group"
          >
            <div className="absolute  rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 blur-sm opacity-20 group-hover:opacity-30 transition-all duration-300"></div>

            <h3 className="text-xl font-bold relative z-10">
              {item.degree} @ {item.institution}
            </h3>

            {item?.schoolImage && (
              <div className="flex justify-center my-4 relative z-10">
                <Image
                  src={getImageUrl(item.schoolImage, '')}
                  alt={` logo of school`}
                  className=" object-contain rounded-lg shadow-md border border-white/10"
                  width={400}
                  height={400}
                />
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1 relative z-10">
              {item.fieldOfStudy && <span>{item.fieldOfStudy} • </span>}
              {new Date(item.startDate).toLocaleDateString()} –{' '}
              {item.current
                ? 'Present'
                : item.endDate
                  ? new Date(item.endDate).toLocaleDateString()
                  : 'N/A'}
            </p>

            <div className="mt-4 relative z-10 bg-white/10 p-4 rounded-md text-sm text-gray-100 max-h-40 overflow-auto hide-scrollbar">
              {item.description ? (
                <RichText
                  data={item.description}
                  className="prose prose-invert max-w-none text-gray-300"
                />
              ) : (
                // <pre className="whitespace-pre-wrap">
                //   {JSON.stringify(item.description, null, 2)}
                // </pre>
                <em>No description provided.</em>
              )}
            </div>

            {item.diplomaFile && typeof item.diplomaFile !== 'string' && (
              <a
                href={item.diplomaFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-blue-300 hover:text-blue-500 underline z-10 relative"
              >
                🎓 View Diploma
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default EducationBlock

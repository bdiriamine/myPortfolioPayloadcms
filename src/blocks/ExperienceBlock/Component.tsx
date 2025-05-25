'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Experience as Props, Skill } from '@/payload-types'
import RichText from '@/components/RichText'

type Experience = {
  id: string
  jobTitle: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current?: boolean
  description: any
  skills: Skill[]
}

const ExperienceBlock: React.FC<Props> = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  const fetchExperiences = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/experience?limit=20`
    const res = await fetch(url)
    const data = await res.json()
    setExperiences(data.docs)
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative bg-gradient-to-br from-black via-zinc-900 to-purple-900 text-white py-20 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-700 opacity-30 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          💼 My <span className="text-purple-500">Professional Experience</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedIds.includes(exp.id)

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring' }}
                onClick={() => toggleExpand(exp.id)}
                className="cursor-pointer bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-bold text-purple-200 mb-2">
                  {exp.jobTitle}
                  <span className="text-white font-normal"> @ {exp.company}</span>
                </h3>
                <p className="text-sm text-white/70">{exp.location}</p>
                <p className="text-sm text-white/50 italic mb-4">
                  {new Date(exp.startDate).toLocaleDateString()} –{' '}
                  {exp.current
                    ? 'Present'
                    : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString()
                      : 'N/A'}
                </p>

                <div
                  className={`text-sm text-white/80 prose prose-invert max-w-none mb-4 transition-all duration-500 ease-in-out ${
                    isExpanded ? '' : 'line-clamp-5'
                  }`}
                >
                  <RichText
                    data={exp.description}
                    className="prose prose-invert max-w-none text-gray-300"
                  />
                </div>

                {exp.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-purple-600/30 text-purple-200 border border-purple-400 text-xs font-semibold px-3 py-1 rounded-full shadow-inner"
                      >
                        {typeof skill === 'string' ? skill : skill?.name}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

export default ExperienceBlock

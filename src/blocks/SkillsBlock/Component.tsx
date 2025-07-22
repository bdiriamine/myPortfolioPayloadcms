'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getImageUrl } from '@/utilities/functon'
import { Skill } from '@/payload-types'

const categories = [
  { label: 'All', value: '' },
  { label: 'Programming Language', value: 'programming' },
  { label: 'Frontend Framework', value: 'frontend-framework' },
  { label: 'Backend Framework', value: 'backend-framework' },
  { label: 'Library', value: 'library' },
  { label: 'Database', value: 'database' },
  { label: 'DevOps / Deployment', value: 'devops' },
  { label: 'Testing', value: 'testing' },
  { label: 'Tooling', value: 'tool' },
  { label: 'Version Control', value: 'version-control' },
  { label: 'Design / UI', value: 'design' },
  { label: 'CMS / Headless CMS', value: 'cms' },
  { label: 'Soft Skill', value: 'soft' },
  { label: 'Electronics / Hardware', value: 'electronics' },
  { label: 'Other', value: 'other' },
]

const SkillsBlock = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [displayedSkills, setDisplayedSkills] = useState<Skill[]>([])
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Fetch all skills once
  const fetchSkills = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/skills?limit=100`
    const res = await fetch(url)
    const data = await res.json()
    setSkills(data.docs)
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  // Filter when category changes
  useEffect(() => {
    const filtered = selectedCategory
      ? skills.filter((skill) => skill.category === selectedCategory)
      : skills

    setDisplayedSkills(filtered.slice(0, 12))
    setExpandedIds(new Set())
  }, [selectedCategory, skills])

  const handleNext = () => {
    if (displayedSkills.length === 0) return
    const newSkills = [...displayedSkills]
    const last = newSkills.pop()!
    newSkills.unshift(last)
    setDisplayedSkills(newSkills)
    setExpandedIds(new Set())
  }

  const handlePrev = () => {
    if (displayedSkills.length === 0) return
    const newSkills = [...displayedSkills]
    const first = newSkills.shift()!
    newSkills.push(first)
    setDisplayedSkills(newSkills)
    setExpandedIds(new Set())
  }

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 py-16 bg-zinc-950">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
        💼 My <span className="text-purple-500">Skills</span>
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === cat.value
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-purple-500 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={handlePrev}
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 z-10"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          aria-label="Next"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 z-10"
        >
          ›
        </button>

        {/* Skills Grid */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            grid-rows-[repeat(4,_auto)] 
            gap-6
          "
        >
          {displayedSkills.map((skill, idx) => {
            const isExpanded = expandedIds.has(skill.id)
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative bg-zinc-800 text-white p-5 rounded-2xl shadow-md hover:shadow-purple-500/30 transition duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => toggleExpand(skill.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  {skill.icon && (
                    <div className="w-12 h-12 relative rounded-full overflow-hidden bg-zinc-700 flex-shrink-0">
                      <Image
                        src={getImageUrl(skill.icon, '')}
                        alt={skill.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <p className="text-sm text-purple-300 capitalize">{skill.category}</p>
                  </div>
                </div>

                <p
                  className={`text-sm text-zinc-300 mb-3 transition-all duration-300 ease-in-out ${
                    isExpanded ? 'whitespace-pre-line' : 'line-clamp-2'
                  }`}
                >
                  {skill.description}
                </p>

                <div className="flex justify-between text-sm text-zinc-400">
                  <span className="capitalize">💡 {skill.proficiency}</span>
                  {skill.yearsOfExperience && (
                    <span>
                      ⏳ {skill.yearsOfExperience} yr{skill.yearsOfExperience > 1 && 's'}
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SkillsBlock

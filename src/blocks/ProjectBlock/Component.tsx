'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Project } from '@/payload-types'
import { motion } from 'framer-motion'
import { getImageUrl } from '@/utilities/functon'
import RichText from '@/components/RichText'
export interface Skill {
  name: string
  slug?: string
}

const ProjectDetails: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [expandedIds, setExpandedIds] = useState<string[]>([]) // Track expanded cards

  const fetchProjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?limit=100&featured=true`
    const res = await fetch(url)
    const data = await res.json()
    setProjects(data.docs)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  if (!projects || projects.length === 0) {
    return <div className="text-center text-gray-400">Loading...</div>
  }

  return (
    <div className="relative bg-gradient-to-br from-black via-zinc-900 to-purple-900 text-white py-16 px-4 sm:px-8 md:px-16 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
        🚀 Featured <span className="text-purple-500">Projects</span>
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {projects.map((project) => {
          const isExpanded = expandedIds.includes(project.id)

          return (
            <SwiperSlide key={project.id}>
              <motion.div
                className="relative bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl overflow-hidden shadow-xl hover:shadow-purple-700/70 transition-transform duration-300 hover:scale-105 cursor-default flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Image with overlay */}
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={getImageUrl(project.imageProject, '')}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 20vw, 15vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold drop-shadow-md">{project.name}</h3>
                    <div className="flex gap-2 mt-1">
                      {project.projectType && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-700/80 text-purple-200 font-semibold shadow-lg shadow-purple-900/50 text-xs">
                          💻 {project.projectType}
                        </span>
                      )}
                      {project.status && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-700/80 text-green-200 font-semibold shadow-lg shadow-green-900/50 text-xs">
                          ✅ {project.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-gray-300 text-sm mb-3 relative">
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-[1000px]' : 'max-h-[4.5rem]' /* ~3 lines */
                      }`}
                    >
                      <RichText data={project.description} />
                    </div>
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
                    )}
                  </div>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="self-start text-xs font-semibold text-purple-400 hover:text-purple-600 transition"
                    aria-label={isExpanded ? 'Read less' : 'Read more'}
                  >
                    {isExpanded ? 'Read Less ▲' : 'Read More ▼'}
                  </button>

                  <div className="mt-auto flex gap-3 flex-wrap pt-4">
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-xs font-semibold shadow-md shadow-green-500/50 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🌐 Demo
                      </Link>
                    )}
                    {project.sourceUrl && (
                      <Link
                        href={project.sourceUrl}
                        target="_blank"
                        className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-xs font-semibold shadow-md shadow-blue-500/50 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        💻 Code
                      </Link>
                    )}
                  </div>
                  {project.skills && project.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => {
                        // skill can be string (id) or Skill object
                        const skillName = typeof skill === 'string' ? skill : skill.name

                        return (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-700/90 text-purple-100 text-xs font-semibold shadow-md shadow-purple-900/40"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-purple-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {skillName}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default ProjectDetails

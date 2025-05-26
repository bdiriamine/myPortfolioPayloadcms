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

const ProjectDetails: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])

  const fetchProjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?limit=3&featured=true`
    const res = await fetch(url)
    const data = await res.json()
    setProjects(data.docs)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

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
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md hover:shadow-purple-600/40 transition-shadow duration-300 overflow-hidden h-full flex flex-col transform hover:scale-[1.01]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={getImageUrl(project.imageProject, '')}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 20vw, 15vw"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white truncate">{project.name}</h3>
                  <div className="text-xs text-gray-300 mb-2 line-clamp-3">
                    <RichText data={project.description} />
                  </div>
                </div>

                <div className="mt-2 flex gap-2 flex-wrap">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      className="text-xs px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 transition font-medium shadow-md shadow-green-400/30"
                    >
                      🌐 Demo
                    </Link>
                  )}
                  {project.sourceUrl && (
                    <Link
                      href={project.sourceUrl}
                      target="_blank"
                      className="text-xs px-3 py-1 rounded-full bg-blue-500 hover:bg-blue-600 transition font-medium shadow-md shadow-blue-400/30"
                    >
                      💻 Code
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProjectDetails

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
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?limit=100&featured=true`
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
    <div className="relative bg-gradient-to-br from-black via-zinc-900 to-purple-900 text-white py-20 px-6 sm:px-12 md:px-20 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight"
      >
        🚀 Featured Projects
      </motion.h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
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
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl hover:shadow-purple-700/40 transition-shadow duration-300 overflow-hidden h-full flex flex-col transform hover:scale-[1.02]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-56 w-full">
                {project.imageProject && (
                  <Image
                    src={getImageUrl(project.imageProject, '')}
                    alt={project.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{project.name}</h3>
                  <div className="text-sm text-gray-300 mb-4 line-clamp-3">
                    <RichText data={project.description} />
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-emerald-500 hover:to-green-500 transition font-medium shadow-md shadow-green-500/30"
                    >
                      🌐 Live Demo
                    </Link>
                  )}
                  {project.sourceUrl && (
                    <Link
                      href={project.sourceUrl}
                      target="_blank"
                      className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-600 transition font-medium shadow-md shadow-blue-500/30"
                    >
                      💻 Source Code
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

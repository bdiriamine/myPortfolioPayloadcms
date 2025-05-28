'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ProfileBlock as ProfileBlockProps } from '@/payload-types'
import { getImageUrl } from '@/utilities/functon'
import RichText from '@/components/RichText'

interface Language {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'native'
}
const ProfileBlock: React.FC<ProfileBlockProps> = ({
  image,
  name,
  phone,
  age,
  email,
  content,
  passport,
  permis,
  disponibilite,
  profile,
  language,
}) => {
  const imgUrl = getImageUrl(image, '')

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative bg-gradient-to-br from-black via-zinc-900 to-purple-900 text-white py-20 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-purple-700 opacity-30 rounded-full blur-3xl z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start max-w-6xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, rotate: -2 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg"
        >
          <Image
            src={imgUrl}
            alt={name}
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </motion.div>

        <div className="space-y-6 text-center md:text-left w-full">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <p className="text-purple-200 text-lg mt-1">{profile}</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-white/80">
            <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              📞 {phone}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              🎂 Age: {age}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              📧 {email}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              🛂 Passport: {passport ? 'Yes ✅' : 'No ❌'}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              🚗 Driving License: {permis ? 'Yes ✅' : 'No ❌'}
            </span>
            {language?.map((lang: Language, index: number) => (
              <span
                key={index}
                className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1"
              >
                🌍 {lang.name} - <span className="capitalize">{lang.level}</span>
              </span>
            ))}
            <span
              className={`px-3 py-1.5 rounded-full border ${
                disponibilite
                  ? 'bg-green-600/20 border-green-400 text-green-300'
                  : 'bg-red-600/20 border-red-400 text-red-300'
              }`}
            >
              {disponibilite ? '🟢 Available for work' : '🔴 Not available'}
            </span>
          </div>
          <RichText data={content} className="prose prose-invert max-w-none text-gray-300" />
        </div>
      </div>
    </motion.section>
  )
}

export default ProfileBlock

'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-black to-purple-900 flex items-center justify-center px-6">
      {/* Glowing background blur effects */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-700 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-2xl z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white max-w-xl"
      >
        <h1 className="text-7xl font-extrabold mb-4 text-purple-500 drop-shadow-lg">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</p>
        <p className="text-white/70 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Button asChild variant="default" className="px-6 py-3 text-base rounded-xl shadow-md">
          <Link href="/">← Go Home</Link>
        </Button>
      </motion.div>
    </div>
  )
}

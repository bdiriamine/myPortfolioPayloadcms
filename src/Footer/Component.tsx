import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'
import { getImageUrl } from '@/utilities/functon'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []
  console.log('socialLinkssocialLinks', socialLinks)
  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12 gap-8 flex flex-col md:flex-row md:justify-between">
        {/* Logo & Social */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {socialLinks.map(({ platform, url, iconImage }, i) => {
              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title={platform}
                >
                  {iconImage ? (
                    <Image
                      src={getImageUrl(iconImage, '')}
                      alt={platform}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  ) : (
                    <span>{platform}</span>
                  )}
                </a>
              )
            })}
          </div>
        </div>

        {/* Navigation + Theme */}
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => (
              <CMSLink
                className="text-white hover:text-yellow-400 transition-colors"
                key={i}
                {...link}
              />
            ))}
          </nav>
        </div>
        <footer className="bg-black text-white text-center py-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Mohamed Amine Bdiri. All rights reserved.
          </p>
        </footer>
      </div>
    </footer>
  )
}

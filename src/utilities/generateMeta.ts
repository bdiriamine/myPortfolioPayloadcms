import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const defaultDescription =
    'Développeur full-stack JavaScript passionné en React, Node.js et Next.js,Angular, avec expertise en électronique, électrotechnique et automatisation industrielle. Découvrez mes projets web et systèmes embarqués.'

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Portfolio Développeur JS'
    : 'Portfolio Développeur Full-Stack JS & Technicien Électronique'

  return {
    description: doc?.meta?.description || defaultDescription,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || defaultDescription,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}

import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName:
    'Développeur full-stack JavaScript passionné en React, Angular, Node.js , Payload cms  et Next.js, avec expertise en électronique, électrotechnique et automatisation industrielle. Découvrez mes projets web et systèmes embarqués.',
  title: 'Mohamed Amine bdiri Portfolio Full stack js',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

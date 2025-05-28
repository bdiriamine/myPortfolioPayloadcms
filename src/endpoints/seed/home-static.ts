import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',

  meta: {
    description:
      'Développeur full-stack JavaScript passionné en React, Angular, Node.js , Payload cms  et Next.js, avec expertise en électronique, électrotechnique et automatisation industrielle. Découvrez mes projets web et systèmes embarqués.',
    title: 'Mohamed Amine bdiri Portfolio Full stack js',
  },
  title: 'Home',
  layout: [],
}

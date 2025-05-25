import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g. Twitter, LinkedIn',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://...',
          },
        },
        {
          name: 'iconImage',
          label: 'Social Media Icon',
          type: 'upload',
          relationTo: 'media', // change this if your media collection has a different slug
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

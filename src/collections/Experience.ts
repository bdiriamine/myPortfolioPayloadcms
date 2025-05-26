import { CollectionConfig } from 'payload'

const Experience: CollectionConfig = {
  slug: 'experience',
  labels: {
    singular: 'Experience',
    plural: 'Experiences',
  },
  admin: {
    useAsTitle: 'jobTitle',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'current',
      type: 'checkbox',
      label: 'I currently work here',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
    },
    {
      name: 'attestationOfWork',
      label: 'Attestation of Work',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'contract',
      label: 'Work Contract',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}

export default Experience

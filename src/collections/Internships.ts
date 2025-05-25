import { CollectionConfig } from 'payload'

const Internships: CollectionConfig = {
  slug: 'internships',
  labels: {
    singular: 'Internship',
    plural: 'Internships',
  },
  admin: {
    useAsTitle: 'company',
  },
  access: {
    read: () => true,
  },
  fields: [
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
      name: 'InternshipsImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'supervisor',
      type: 'text',
      label: 'Supervisor Name',
    },
    {
      name: 'supervisorContact',
      type: 'text',
      label: 'Supervisor Contact',
    },
    {
      name: 'attestation',
      type: 'upload',
      relationTo: 'media',
      label: 'Attestation File',
    },
  ],
}

export default Internships

import { CollectionConfig } from 'payload'

const Education: CollectionConfig = {
  slug: 'education',
  labels: {
    singular: 'Education',
    plural: 'Education',
  },
  admin: {
    useAsTitle: 'degree',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'degree',
      type: 'text',
      required: true,
    },
    {
      name: 'institution',
      type: 'text',
      required: true,
    },
    {
      name: 'fieldOfStudy',
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
      name: 'schoolImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'current',
      type: 'checkbox',
      label: 'I currently study here',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'diplomaFile',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Education

import { CollectionConfig } from 'payload'

const Certifications: CollectionConfig = {
  slug: 'certifications',
  labels: {
    singular: 'Certification',
    plural: 'Certifications',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'issuingOrganization',
      type: 'text',
      required: true,
    },
    {
      name: 'issueDate',
      type: 'date',
      required: true,
    },
    {
      name: 'expirationDate',
      type: 'date',
    },
    {
      name: 'credentialID',
      type: 'text',
    },
    {
      name: 'credentialURL',
      type: 'text',
    },
    {
      name: 'certificateFile',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Certifications

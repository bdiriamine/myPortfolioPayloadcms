import { Block, Field } from 'payload'

const contactBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    required: true,
  },
  {
    name: 'submitButtonLabel',
    type: 'text',
    label: 'Submit Button Label',
    defaultValue: 'Send Message',
  },
  {
    name: 'contactInfo',
    type: 'array',
    label: 'Contact Info Items',
    labels: {
      singular: 'Info Item',
      plural: 'Info Items',
    },
    required: true,
    minRows: 1,
    maxRows: 3,
    fields: [
      {
        name: 'icon',
        type: 'upload',
        label: 'Icon',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'label',
        type: 'text',
        label: 'Label (e.g., 123 Rio de Janeiro)',
        required: true,
      },
      {
        name: 'link',
        type: 'text',
        label: 'Link (e.g., tel:123456, mailto:email@example.com, or #)',
        required: true,
      },
    ],
  },
]

export const ContactBlock: Block = {
  slug: 'ContactBlock',
  interfaceName: 'ContactBlock',
  fields: contactBlockFields,
}

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
]
export const ContactBlock: Block = {
  slug: 'ContactBlock',
  interfaceName: 'ContactBlock',
  fields: contactBlockFields,
}

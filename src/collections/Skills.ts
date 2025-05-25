import { CollectionConfig } from 'payload'

const Skills: CollectionConfig = {
  slug: 'skills',
  labels: {
    singular: 'Skill',
    plural: 'Skills',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'proficiency'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Programming Language',
          value: 'programming',
        },
        {
          label: 'Library',
          value: 'library',
        },

        {
          label: 'Framework',
          value: 'framework',
        },
        {
          label: 'Tool',
          value: 'tool',
        },
        {
          label: 'Language',
          value: 'language',
        },
        {
          label: 'Soft Skill',
          value: 'soft',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      required: true,
    },
    {
      name: 'proficiency',
      type: 'select',
      options: [
        {
          label: 'Beginner',
          value: 'beginner',
        },
        {
          label: 'Intermediate',
          value: 'intermediate',
        },
        {
          label: 'Advanced',
          value: 'advanced',
        },
        {
          label: 'Expert',
          value: 'expert',
        },
      ],
      defaultValue: 'intermediate',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Skill Icon',
    },
    {
      name: 'yearsOfExperience',
      type: 'number',
      min: 0,
      max: 50,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Skill',
      defaultValue: false,
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        condition: (data: any) => data.category === 'programming' || data.category === 'framework',
      },
    },
  ],
  timestamps: false, // Skills typically don't need timestamps
}

export default Skills

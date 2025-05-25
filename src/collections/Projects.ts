import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
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
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Planning',
          value: 'planning',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'On Hold',
          value: 'on-hold',
        },
      ],
      defaultValue: 'in-progress',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        condition: (data: any) => data.status === 'completed',
      },
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      admin: {
        description: 'Technologies and skills used in this project',
      },
    },
    {
      name: 'experience',
      type: 'relationship',
      relationTo: 'experience',
      admin: {
        description: 'Related professional experience (if applicable)',
      },
    },
    {
      name: 'projectType',
      type: 'select',
      options: [
        {
          label: 'Personal',
          value: 'personal',
        },
        {
          label: 'Professional',
          value: 'professional',
        },
        {
          label: 'Academic',
          value: 'academic',
        },
        {
          label: 'Open Source',
          value: 'open-source',
        },
      ],
      required: true,
    },
    {
      name: 'imageProject',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'demoUrl',
      type: 'text',
      label: 'Demo URL',
    },
    {
      name: 'sourceUrl',
      type: 'text',
      label: 'Source Code URL',
    },
    {
      name: 'documentationUrl',
      type: 'text',
      label: 'Documentation URL',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Detailed Content',
    },
    {
      name: 'challenges',
      type: 'richText',
      label: 'Challenges & Solutions',
    },
    {
      name: 'lessonsLearned',
      type: 'richText',
      label: 'Lessons Learned',
    },
    ...slugField(),
  ],
}

export default Projects

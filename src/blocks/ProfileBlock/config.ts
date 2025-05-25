import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  HeadingFeature,
  AlignFeature,
  IndentFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  LinkFeature,
  RelationshipFeature,
  BlockquoteFeature,
  UploadFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
  BlocksFeature,
  TreeViewFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { Banner } from '../Banner/config'
import { MediaBlock } from '../MediaBlock/config'

export const ProfileBlock: Block = {
  slug: 'profileBlock',
  interfaceName: 'ProfileBlock',
  imageURL: '/icons/profile.svg', // Optional: for admin icon
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'age',
      type: 'number',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'passport',
      type: 'checkbox',
      label: 'Do you have a passport?',
    },
    {
      name: 'permis',
      type: 'checkbox',
      label: 'Do you have a driving license (permis)?',
    },
    {
      name: 'disponibilite',
      type: 'checkbox',
      label: 'are you Available to work?',
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
      label: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          SubscriptFeature(),
          SuperscriptFeature(),
          InlineCodeFeature(),
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          AlignFeature(),
          IndentFeature(),
          BlockquoteFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          UploadFeature(),
          LinkFeature(),
          RelationshipFeature(),
          BlocksFeature({ blocks: [Banner, MediaBlock] }),

          InlineToolbarFeature(),
          FixedToolbarFeature(),
          HorizontalRuleFeature(),
        ],
      }),
    },
    {
      name: 'enableLink',
      type: 'checkbox',
    },
    link({
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
  ],
}

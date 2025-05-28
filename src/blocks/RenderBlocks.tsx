import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import ProfileBlock from './ProfileBlock/Component'
import SkillsBlock from './SkillsBlock/Component'
import ExperienceBlock from './ExperienceBlock/Component'
import EducationBlock from './EducationBlock/Component'
import InternshipsBlock from './InternshipsBlock/Component'
import ProjectBlock from './ProjectBlock/Component'
import ContactBlock from './ContactBlock/Component'
import CertificationsBlock from './CertificationBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  profileBlock: ProfileBlock,
  SkillsBlock: SkillsBlock,
  ExperienceBlock: ExperienceBlock,
  EducationBlock: EducationBlock,
  InternshipsBlock: InternshipsBlock,
  ProjectBlock: ProjectBlock,
  ContactBlock: ContactBlock,
  CertificationsBlock: CertificationsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

import React, { useContext, useState } from 'react'
import { Block } from '../context/interface'

import { SegmentCompositeStages } from './SegmentCompositeStages'

const SegmentView: React.FC<{
  block: Block
}> = ({ block }) => {
  switch (block.type) {
    case 'COMPOSITE_PARALLEL':
    case 'COMPOSITE_SEQUENTIAL':
      return (
        <SegmentCompositeStages
          type={block.type}
          children={block.children}
        />
      )
    default:
      return <span />
  }
}

export { SegmentView }
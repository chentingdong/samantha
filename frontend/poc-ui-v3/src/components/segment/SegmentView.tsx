import React, { useContext, useState } from 'react'
import { Block } from '../context/interface'

import { SegmentCompositeStages } from './SegmentCompositeStages'

const SegmentView: React.FC<{
  block: Block
  setCatalogItem: (block: Block) => void
}> = ({ block, setCatalogItem }) => {
  switch (block.type) {
    case 'COMPOSITE_PARALLEL':
    case 'COMPOSITE_SEQUENTIAL':
      return (
        <SegmentCompositeStages
          type={block.type}
          children={block.children}
          setCatalogItem={setCatalogItem}
        />
      )
    default:
      return <span />
  }
}

export { SegmentView }
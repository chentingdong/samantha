import React from 'react'
import { Block } from '../context/interface'
import { SegmentView } from '../segment/SegmentView'
import { DndSourceBox } from './DndSourceBox'

const BlockCatalogItem: React.FC<{
  block: Block
  index?: number
}> = ({ block, index = 0 }) => {
  if (!block) return <></>
  // TODO: sync with backend of types
  const color = block.type.includes('LEAF_') ? 'light-green' : 'light-brown'
  return (
    <div className="" key={block.id}>
      <DndSourceBox type="block" block={block}>
        <div className={`card border-${color} `}>
          <strong className={`card-header bg-${color}`}>
            {index}
            <span className="p-2">-</span>
            {block.name}
          </strong>
          <div className="card-body">{block.description}</div>
          <SegmentView block={block} />
        </div>
      </DndSourceBox>
    </div>
  )
}

export { BlockCatalogItem }
import React from 'react'
import { Block } from '../context/interface'
import { SegmentView } from '../segment/SegmentView'
import { DndSourceBox } from './DndSourceBox'

export const BlockCatalogItem: React.FC<{
  block: Block
  index?: number
  setCatalogItem?: (block: Block) => void
}> = ({ block, index = 0, setCatalogItem }) => {
  if (!block) return <></>
  // TODO: sync with backend of types
  const blockWidth = block.type.includes('LEAF_') ? 'col-3' : 'col-12'
  const color = block.type.includes('LEAF_') ? 'light-green' : 'light-brown'
  return (
    <div className={`p-0 m-2 ${blockWidth}`} key={block.id}>
      <DndSourceBox type="block" block={block}>
        <div className={`card border-${color} `}>
          <strong className={`card-header bg-${color}`}>
            {index}
            <span className="p-2">-</span>
            {block.name}
          </strong>
          <div className="card-body">{block.description}</div>
          <SegmentView block={block} setCatalogItem={setCatalogItem} />
        </div>
      </DndSourceBox>
    </div>
  )
}

import React from 'react'
import { Block } from '../context/interface'
import { SegmentView } from '../segment/SegmentView'
import { DndSourceBox } from './DndSourceBox'

const BlockCatalogItem: React.FC<{
  block: Block
  index?: number
  onDelete?: (child: Block)=>void
}> = ({ block, index = 0, onDelete }) => {
  // TODO: sync with backend of types
  const color = block.type.includes('LEAF_') ? 'light-green' : 'light-brown'
  return (
    <div className="" key={block.id}>
      <div className={`card border-${color}`}>
        <strong className={`card-header bg-${color}`}>
          <button className="close" aria-label="Close" onClick={()=>onDelete(block)}>
            <span aria-hidden="true">&times;</span>
          </button>
          {index + 1}
          <span className="p-2">-</span>
          {block.name}
        </strong>
        <div className="card-body">{block.description}</div>
        <SegmentView block={block} />
      </div>
    </div>
  )
}

export { BlockCatalogItem }
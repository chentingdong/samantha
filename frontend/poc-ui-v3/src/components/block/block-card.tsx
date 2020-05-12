import React from 'react'
import { BlockDef } from '../context/interface'
import { SegmentView } from './segment-view'

export const BlockCard: React.FC<{
  block: BlockDef
  index?: number
  updateOneBlock?: (block: BlockDef) => void
}> = ({ block, index = 0, updateOneBlock }) => {
  if (!block) return <></>
  const blockWidth = block.type === 'leaf' ? 'col-3' : 'col-12'
  const color = block.type === 'leaf' ? 'light-green' : 'light-brown'
  return (
    <div className={`p-0 m-2 ${blockWidth}`} key={block.id}>
      <div className={`card border-${color} `}>
        <strong className={`card-header bg-${color}`}>
          {index}
          <span className="p-2">-</span>
          {block.name}
        </strong>
        <div className="card-body">{block.description}</div>
        <SegmentView block={block} updateBlock={updateOneBlock} />
      </div>
    </div>
  )
}

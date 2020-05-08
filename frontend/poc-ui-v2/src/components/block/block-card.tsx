import React, { useContext } from 'react'
import { BlockDef } from '../context/interface'
import { SegmentView } from './segment-view'

export const BlockCard: React.FC<{
  block: BlockDef
  cardClass?: string
  index: number
  updateOneBlock: (block: BlockDef) => void
}> = ({ block, cardClass = 'col-4', index, updateOneBlock }) => {
  const blockWidth = block?.type === 'leaf' ? 'col-4' : 'col-12'
  const color = block.type === 'leaf' ? 'light-green' : 'light-brown'

  return (
    <div
      className={`card p-0 mb-2 ${cardClass} border-${color} ${blockWidth}`}
      key={block.id}
    >
      <strong className={`card-header bg-${color}`}>
        {index}
        <span className="p-2">-</span>
        {block.name}
      </strong>
      <div className="card-body">{block.description}</div>
      <SegmentView block={block} updateBlock={updateOneBlock} />
    </div>
  )
}

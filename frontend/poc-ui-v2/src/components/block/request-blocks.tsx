import React from 'react'
import { BlockDef } from '../context/interface'
import { SegmentView } from './segment-view'

// BlockDef cards that dropped in requestDef editing area
export const RequestBlocks: React.FC<{
  blocks: BlockDef[]
  cardClass?: string
}> = ({ blocks, cardClass = 'col-4' }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {blocks.map((block) => {
          const blockWidth = block?.type === 'leaf' ? 'col-4' : 'col-12'
          const borderColor =
            block.type === 'leaf' ? 'border-light-green' : 'border-light-brown'
          const bgColor =
            block.type === 'leaf' ? 'bg-light-green' : 'bg-light-brown'

          return (
            <div
              className={`card p-0 ${cardClass} ${borderColor} ${blockWidth}`}
              key={block.id}
            >
              <strong className={`card-header ${bgColor}`}>{block.name}</strong>
              <div className="card-body">{block.description}</div>
              <SegmentView block={block} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

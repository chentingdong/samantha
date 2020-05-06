import React from 'react'
import { BlockDef } from '../context/interface'
import { SegmentView } from './segment-view'

// BlockDef cards that dropped in requestDef editing area
export const RequestBlocks: React.FC<{ blocks: BlockDef[] }> = ({ blocks }) => {
  return (
    <div className="container-fluid p-2">
      {blocks.map((block, index) => {
        const blockWidth = block.type === 'leaf' ? 'col-4' : 'col-12'
        const borderColor =
          block.type === 'leaf' ? 'border-light-green' : 'border-light-brown'
        const bgColor =
          block.type === 'leaf' ? 'bg-light-green' : 'bg-light-brown'
        return (
          <div
            className={`card p-0 mb-2 ${borderColor} ${blockWidth}`}
            key={`rqs-${index}`}
          >
            <strong className={`card-header ${bgColor}`}>{block.name}</strong>
            <div className="card-body">{block.description}</div>
            <SegmentView block={block} />
          </div>
        )
      })}
    </div>
  )
}

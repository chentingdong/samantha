import React from 'react'
import { BlockDef } from '../context/interface'

// BlockDef cards that dropped in requestDef editing area
export const RequestBlocks: React.FC<{ blocks: BlockDef[] }> = ({ blocks }) => {
  return (
    <div className="container-fluid p-2">
      {blocks.map((block, index) => {
        const classNameByType = block.type === 'leaf' ? 'col-4' : 'col-12'
        return (
          <div
            className={`card p-0 mb-2 ${classNameByType}`}
            key={`rqs-${index}`}
          >
            <strong className="card-header">{block.name}</strong>
            <div className="card-body">{block.description}</div>
          </div>
        )
      })}
    </div>
  )
}

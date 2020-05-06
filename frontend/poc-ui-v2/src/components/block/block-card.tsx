import React, { CSSProperties } from 'react'

export const BlockCard = ({ className, block }) => {
  return (
    <div className={className}>
      <strong className="card-header">{block.name}</strong>
      <div className="card-body">{block.description}</div>
    </div>
  )
}

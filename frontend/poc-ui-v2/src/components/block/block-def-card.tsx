import React, { CSSProperties } from 'react'

export const BlockDefCard = ({ blockDef }) => {
  return (
    <div className="card">
      <strong className="card-header">{blockDef.name}</strong>
      <div className="card-body">{blockDef.description}</div>
    </div>
  )
}

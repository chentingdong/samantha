import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { BlockDef } from '../context/interface'

export const DndTargetBox: React.FC<{
  accept: string
  onDrop: (item: BlockDef) => void
}> = ({ accept, onDrop, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: accept,
    hover: (item, monitor) => {
      monitor.isOver({ shallow: true })
    },
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const hoverClass = isOver && canDrop ? 'bg-highlight' : ''
  return (
    <div
      ref={drop}
      className={`border-gray ${hoverClass}`}
      style={{ minHeight: '100px', borderStyle: 'dotted' }}
    >
      {children}
    </div>
  )
}

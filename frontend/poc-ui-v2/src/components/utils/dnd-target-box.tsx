import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'

export interface TargetBoxProps {
  accept: string
  onDrop: (item: any) => void
}

export const DndTargetBox: React.FC<TargetBoxProps> = ({
  accept,
  onDrop,
  children,
}) => {
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
    <div ref={drop}>
      <div
        className={`w-100 h-100 border-gray ${hoverClass}`}
        style={{ minHeight: '100px', borderStyle: 'dashed' }}
      >
        {children}
      </div>
    </div>
  )
}

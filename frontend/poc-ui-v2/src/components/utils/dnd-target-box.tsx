import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'

export const DndTargetBox: React.FC<{
  accept: string
  onDrop: (item: any) => void
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
      style={{ minHeight: '100px', borderStyle: 'dashed' }}
    >
      {React.Children.toArray(children).length === 0 && (
        <div className="m-auto align-self-center">drag a block here...</div>
      )}
      {children}
    </div>
  )
}

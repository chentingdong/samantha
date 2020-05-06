import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'

export interface TargetBoxProps {
  accept: string
  onDrop: (item: any) => void
  lastDroppedColor?: string
}

export const DragTargetBox: React.FC<TargetBoxProps> = ({ onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'block',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <div ref={drop}>
      <div className="border" style={{ width: '400px', height: '300px' }}></div>
    </div>
  )
}

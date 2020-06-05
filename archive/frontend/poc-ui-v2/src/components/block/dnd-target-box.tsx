import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { BlockDef } from '../context/interface'

type DndTargetBoxProps = {
  accept: string
  greedy?: boolean
  onDrop: (item: BlockDef) => void
}
export const DndTargetBox: React.FC<DndTargetBoxProps> = ({
  accept,
  onDrop,
  greedy = false,
  children,
}) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: accept,
    hover: (item, monitor) => {
      monitor.isOver()
    },
    drop: (item: { type: 'string'; blockDef: BlockDef }, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      onDrop(item.blockDef)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: false }),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const hoverClass = isOverCurrent || (isOver && greedy) ? 'bg-highlight' : ''
  return (
    <div
      ref={drop}
      className={`border-gray pb-2 ${hoverClass}`}
      style={{ minHeight: '100px', borderStyle: 'dotted' }}
    >
      {children}
    </div>
  )
}

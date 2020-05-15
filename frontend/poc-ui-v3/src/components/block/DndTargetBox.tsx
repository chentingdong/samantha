import React from 'react'
import { useDrop } from 'react-dnd'
import { Block } from '../context/interface'

type DndTargetBoxProps = {
  accept: string
  greedy?: boolean
  onDrop: (item: Block) => void
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
    drop: (item: { type: 'string'; block: Block }, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      onDrop(item.block)
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
      style={{ minHeight: '200px', borderStyle: 'dotted' }}
    >
      {children}
    </div>
  )
}

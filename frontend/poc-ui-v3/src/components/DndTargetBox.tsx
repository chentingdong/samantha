import React from "react"
import { useDrop } from "react-dnd"
import { Block, BlockDef, BlockOrDef } from "../models/interface"

type DndTargetBoxProps = {
  accept: string
  greedy?: boolean
  onDrop: (item: BlockOrDef) => void
}
const DndTargetBox: React.FC<DndTargetBoxProps> = ({
  accept,
  onDrop,
  greedy = false,
  children,
}) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept,
    hover: (item, monitor) => {
      monitor.isOver()
    },
    drop: (item: { type: "string"; block: BlockOrDef }, monitor) => {
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

  const hoverClass = isOverCurrent || (isOver && greedy) ? "bg-highlight" : ""
  return (
    <div
      ref={drop}
      className={`border-gray pb-2 ${hoverClass}`}
      style={{ minHeight: "200px", borderStyle: "dotted" }}
    >
      {children}
    </div>
  )
}

export { DndTargetBox }

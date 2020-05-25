import React from "react"
import { useDrop } from "react-dnd"
import { Block } from "../models/interface"

type DndTargetBoxProps = {
  accept: string
  greedy?: boolean
  onDrop: (item: Block) => void
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
    drop: (item: { type: "string"; block: Block }, monitor) => {
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

  const highlight = isOverCurrent || (isOver && greedy)
  const highlightStyle = {
    background: "rgba(128,128,128,0.15)",
  }

  return (
    <div ref={drop} className={`pb-2`} style={highlight ? highlightStyle : {}}>
      {children}
    </div>
  )
}

export { DndTargetBox }

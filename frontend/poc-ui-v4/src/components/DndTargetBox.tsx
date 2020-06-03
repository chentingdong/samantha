import React from "react"
import { useDrop } from "react-dnd"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import styled from "styled-components"

type DndTargetBoxProps = {
  accept: string | string[]
  greedy?: boolean
  onDrop: (item: BlockOrDef, type: string) => void
}
const DndTargetBoxRaw: React.FC<DndTargetBoxProps> = ({
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
    drop: (
      item: {
        type: "string"
        block: BlockOrDef
      },
      monitor
    ) => {
      if (monitor.didDrop()) {
        return
      }
      onDrop(item.block, item.type)
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
      className={`${hoverClass}`}
      style={{ minHeight: "200px", borderStyle: "dotted" }}
    >
      {children}
    </div>
  )
}

const DndTargetBox = styled(DndTargetBoxRaw)`
  border: red;
  min-height: 100px;
  .bg-highlight {
    background: var(--color-bg-primary);
  }
`

export { DndTargetBox }

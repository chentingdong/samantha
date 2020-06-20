import React from "react"
import { useDrag, DragSourceMonitor } from "react-dnd"

const DndSourceBox = ({ block, type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      block,
      type,
    },
    canDrag: () => {
      const canDrag = block.__typename === "blockDefs"
      return canDrag
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const draggingStyle = isDragging ? { opacity: "0.3" } : { opacity: "1" }
  return (
    <div ref={drag} style={draggingStyle}>
      {children}
    </div>
  )
}

export { DndSourceBox }

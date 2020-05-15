import React from "react"
import uuid from "uuid"
import { useDrag, DragSourceMonitor } from "react-dnd"

const DndSourceBox = ({ block, type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: Object.assign({}, { block: { ...block, id: uuid.v4(), __mutation_type__: "CREATE" }, type: type }),
    canDrag: true,
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

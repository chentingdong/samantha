import React from 'react'
import uuid from 'uuid'
import { useDrag, DragSourceMonitor } from 'react-dnd'

export const DndSourceBox = ({ blockDef, type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: Object.assign(
      {},
      { blockDef: { ...blockDef, id: uuid.v4() }, type: type }
    ),
    canDrag: true,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return <div ref={drag}>{children}</div>
}

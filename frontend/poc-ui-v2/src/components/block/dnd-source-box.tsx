import React, { useState, useCallback, useMemo } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'

export const DndSourceBox = ({ blockDef, type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { blockDef: blockDef, type: type },
    canDrag: true,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return <div ref={drag}>{children}</div>
}

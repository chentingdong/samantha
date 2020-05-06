import React, { useState, useCallback, useMemo } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'

export const DragSourceBox = ({ blockDef, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { blockDef: blockDef, type: 'block' },
    canDrag: true,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return <div ref={drag}>{children}</div>
}

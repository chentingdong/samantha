import React from 'react'
import { BlockCard } from './block-card'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

export default {
  title: 'Block',
  component: BlockCard,
}

const block = {
  id: '1',
  name: 'default request, parallel block container',
  description: 'empty request wrapper',
  type: 'parallelStages',
  state: 'pending',
  requester: '',
  responders: [],
  blocks: [
    {
      id: 'leaf-3',
      name: 'collect timesheet',
      description: 'collect timesheets',
      type: 'leaf',
      state: 'active',
      requester: '',
      responders: [],
      blocks: [],
    },
  ],
}

export const blockCard = () => (
  <DndProvider backend={Backend}>
    <BlockCard block={block} />
  </DndProvider>
)

import React from 'react'
import { BlockCard } from './block-card'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

export default {
  title: 'Block',
  component: BlockCard,
}

// TODO: load data from context store
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
      id: 'leaf-1',
      name: 'collect timesheet',
      description: 'collect timesheets',
      type: 'leaf',
      state: 'active',
      requester: '',
      responders: [],
      blocks: [],
    },
    {
      id: 'leaf-2',
      name: 'rating',
      description: 'team rating',
      type: 'leaf',
      state: 'active',
      requester: '',
      responders: [],
      blocks: [],
    },
    {
      id: 'leaf-3',
      name: 'approval',
      description: 'need approval from another person',
      type: 'leaf',
      state: 'active',
      requester: '',
      responders: [],
      blocks: [],
    },
  ],
}

const blockLeaf = block.blocks[0]
const blockComposite = { ...block, blocks: [] }

const blockComplex = {
  id: '1',
  name: 'default request, parallel block container',
  description: 'empty request wrapper',
  type: 'parallelStages',
  state: 'pending',
  requester: '',
  responders: [],
  blocks: [
    {
      id: '1',
      name: 'default request, parallel block container',
      description: 'empty request wrapper',
      type: 'parallelStages',
      state: 'pending',
      requester: '',
      responders: [],
      blocks: [
        {
          id: 'leaf-1',
          name: 'collect timesheet',
          description: 'collect timesheets',
          type: 'leaf',
          state: 'active',
          requester: '',
          responders: [],
          blocks: [],
        },
        {
          id: 'leaf-2',
          name: 'rating',
          description: 'team rating',
          type: 'leaf',
          state: 'active',
          requester: '',
          responders: [],
          blocks: [],
        },
        {
          id: '1',
          name: 'default request, parallel block container',
          description: 'empty request wrapper',
          type: 'parallelStages',
          state: 'pending',
          requester: '',
          responders: [],
          blocks: [
            {
              id: 'leaf-1',
              name: 'collect timesheet',
              description: 'collect timesheets',
              type: 'leaf',
              state: 'active',
              requester: '',
              responders: [],
              blocks: [],
            },
          ],
        },
      ],
    },
  ],
}

export const blockCards = () => (
  <div>
    <h2>Blocks</h2>
    <p>Sample of blocks</p>
    <DndProvider backend={Backend}>
      <section>
        <h3>Leaf Block</h3>
        <p>a simple leaf block</p>
        <BlockCard block={blockLeaf} />
      </section>
      <section>
        <h3>Container Block</h3>
        <p>a simple container block</p>
        <BlockCard block={blockComposite} />
      </section>
      <section>
        <h3>Composite Block</h3>
        <p>a composite block can contain sub blocks</p>
        <BlockCard block={block} />
      </section>
      <section>
        <h3>Complex Block</h3>
        <p>a complex block can contain multiple levels</p>
        <BlockCard block={blockComplex} />
      </section>
    </DndProvider>
  </div>
)

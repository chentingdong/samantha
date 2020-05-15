import React from 'react'
import { BlockCard } from './block-card'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'BlockOld',
  component: BlockCard,
  decorators: [withKnobs],
}

import blockStories from '../../../data/storybook-blocks.json'

const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }

export const leafBlock = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockLeaf} />
    </DndProvider>
  )
}

export const CompositeBlockLevel0 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockLevel0} />
    </DndProvider>
  )
}

export const CompositeBlockLevel1 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockLevel1} />
    </DndProvider>
  )
}

export const CompositeBlockLevel2 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCard block={blockLevel2} />
    </DndProvider>
  )
}

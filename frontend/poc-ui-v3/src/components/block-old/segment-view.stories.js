import React from "react"
import { SegmentView, segmentCompositeStages } from "./segment-view"
import { withKnobs } from "@storybook/addon-knobs"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import blockStories from "../../../data/storybook-blocks.json"

export default {
  title: "Segment View",
  component: SegmentView,
  decorators: [withKnobs],
}

const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }

const leafBlock = () => {
  return (
    <DndProvider backend={Backend}>
      <SegmentView block={blockLeaf} />
    </DndProvider>
  )
}

const parallelCompositeBlockLevel0 = () => {
  return (
    <DndProvider backend={Backend}>
      <SegmentView block={blockLevel0} />
    </DndProvider>
  )
}

const parallelCompositeBlockLevel1 = () => {
  return (
    <DndProvider backend={Backend}>
      <SegmentView block={blockLevel1} />
    </DndProvider>
  )
}

const parallelCompositeBlockLevel2 = () => {
  return (
    <DndProvider backend={Backend}>
      <SegmentView block={blockLevel2} />
    </DndProvider>
  )
}

export {
  leafBlock,
  parallelCompositeBlockLevel0,
  parallelCompositeBlockLevel1,
  parallelCompositeBlockLevel2,
}

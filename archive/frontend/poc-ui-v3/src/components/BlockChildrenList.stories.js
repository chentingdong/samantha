import React from "react"
import { BlockChildrenList } from "./BlockChildrenList"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"

import blockStories from "../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }

export default {
  title: "Components / BlockChildrenList",
  decorators: [
    (storyFn) => <DndProvider backend={Backend}>{storyFn()}</DndProvider>,
  ],
}

export const noChildren = () => (
  <BlockChildrenList blocks={blockLeaf.children} />
)
export const level1 = () => <BlockChildrenList blocks={blockLevel1.children} />
export const level2 = () => <BlockChildrenList blocks={blockLevel2.children} />

import React from "react"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }

export default {
  title: "Components / BlockChildrenItem",
  decorators: [
    (storyFn) => <DndProvider backend={Backend}>{storyFn()}</DndProvider>,
  ],
}

export const leaf = () => <BlockChildrenItem block={blockLeaf} />
export const level0 = () => <BlockChildrenItem block={blockLevel0} />
export const level1 = () => <BlockChildrenItem block={blockLevel1} />
export const level2 = () => <BlockChildrenItem block={blockLevel2} />

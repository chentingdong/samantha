import React from "react"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"

import blockStories from "../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }

export default {
  title: "Block / BlockCatalogItem",
  decorators: [
    (storyFn) => <DndProvider backend={Backend}>{storyFn()}</DndProvider>,
  ],  
}

export const Leaf = () => <BlockCatalogItem block={blockLeaf} />
export const Level0 = () => <BlockCatalogItem block={blockLevel0} />
export const Level1 = () => <BlockCatalogItem block={blockLevel1} />
export const Level2 = () => <BlockCatalogItem block={blockLevel2} />

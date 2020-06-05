import React from "react"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"

import blockStories from "../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]

export default {
  title: "Components / BlockCatalogItem",
  decorators: [
    (storyFn) => <DndProvider backend={Backend}>{storyFn()}</DndProvider>,
  ],
}

export const level2 = () => <BlockCatalogItem blockDef={blockLevel2} />

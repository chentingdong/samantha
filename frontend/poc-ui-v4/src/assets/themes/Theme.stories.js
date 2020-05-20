import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "../../components/BlockCatalogItem"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]

export default {
  title: "Theme /Material UI / BlockCatalogItem",
}
const MuiBlockCatalogItemLeaf = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCatalogItem block={blockLeaf} />
    </DndProvider>
  )
}

export { MuiBlockCatalogItemLeaf }

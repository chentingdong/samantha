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
}

const BlockCatalogItemLeaf = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCatalogItem block={blockLeaf} />
    </DndProvider>
  )
}

const BlockCatalogItemLv0 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCatalogItem block={blockLevel0} />
    </DndProvider>
  )
}

const BlockCatalogItemLv1 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCatalogItem block={blockLevel1} />
    </DndProvider>
  )
}

const BlockCatalogItemLv2 = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCatalogItem block={blockLevel2} />
    </DndProvider>
  )
}

export {
  BlockCatalogItemLeaf,
  BlockCatalogItemLv0,
  BlockCatalogItemLv1,
  BlockCatalogItemLv2,
}

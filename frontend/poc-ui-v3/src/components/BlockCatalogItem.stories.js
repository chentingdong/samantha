import React from "react"
import { BlockCatalogItem } from "./BlockCatalogItem"

import blockStories from "../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }

export default {
  title: "Block / BlockCatalogItem",
}

const BlockCatalogItemLeaf = () => {
  return <BlockCatalogItem block={blockLeaf} />
}

const BlockCatalogItemLv0 = () => {
  return <BlockCatalogItem block={blockLevel0} />
}

const BlockCatalogItemLv1 = () => {
  return <BlockCatalogItem block={blockLevel1} />
}

const BlockCatalogItemLv2 = () => {
  return <BlockCatalogItem block={blockLevel2} />
}

export { BlockCatalogItemLeaf, BlockCatalogItemLv0, BlockCatalogItemLv1, BlockCatalogItemLv2 }

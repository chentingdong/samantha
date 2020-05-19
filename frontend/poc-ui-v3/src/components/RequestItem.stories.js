import React from "react"
import { RequestItem } from "./RequestItem"
import { BlockCatalogItem } from "./BlockCatalogItem"

import blockStories from "../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }

export default {
  title: "Block / RequestItem",
}

const RequestCatalog = () => {
  return <RequestItem block={blockLevel2} />
}

const BlockCatalog = () => {
  return <BlockCatalogItem block={blockLevel2} />
}

const RequestsMade = () => {
  return <RequestItem block={blockLevel2} />
}

const RequestsReceived = () => {
  return <RequestItem block={blockLevel2} />
}

export { RequestCatalog, BlockCatalog, RequestsMade, RequestsReceived }

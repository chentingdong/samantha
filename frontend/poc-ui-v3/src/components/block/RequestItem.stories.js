import React from "react"
import { RequestorSurface } from "./RequestorSurface"
import { getClient } from "../../index"
import { ApolloProvider } from "@apollo/client"
import { RequestCatalogItem } from "./RequestCatalogItem"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { RequestsMadeItem } from "./RequestsMadeItem"
import { RequestsReceivedItem } from "./RequestsReceivedItem"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }

export default {
  title: "Block / RequestItem",
}

const RequestCatalog = () => {
  return <RequestCatalogItem block={blockLevel2} />
}

const BlockCatalog = () => {
  return <BlockCatalogItem block={blockLevel2} />
}

const RequestsMade = () => {
  return <RequestsMadeItem block={blockLevel2} />
}

const RequestsReceived = () => {
  return <RequestsReceivedItem block={blockLevel2} />
}

export { RequestCatalog, BlockCatalog, RequestsMade, RequestsReceived }
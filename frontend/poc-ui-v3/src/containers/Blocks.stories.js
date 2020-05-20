import React from "react"
import { RequestCatalogList } from "./RequestCatalogList"
import { BlockCatalogList } from "./BlockCatalogList"
import { RequestsMadeList } from "./RequestsMadeList"
import { RequestsReceivedList } from "./RequestsReceivedList"
import { ApolloProvider } from "@apollo/client"
import blockStories from "../../data/storybook-blocks.json"
import { getClient } from "../index"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"

const client = getClient()

export default {
  title: "Containers",
  decorators: [
    (storyFn) => (
      <ApolloProvider client={client}>
        <DndProvider backend={Backend}>{storyFn()}</DndProvider>
      </ApolloProvider>
    ),
  ],
}

export const AsRequestCatalog = () => <RequestCatalogList />
export const AsBlockCatalog = () => <BlockCatalogList />
export const AsRequestsMade = () => <RequestsMadeList />
export const AsRequestsReceived = () => <RequestsReceivedList />

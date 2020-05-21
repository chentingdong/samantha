import React from "react"
import { RequestCatalogList } from "./RequestCatalogList"
import { BlockCatalogList } from "./BlockCatalogList"
import { RequestsMadeList } from "./RequestsMadeList"
import { RequestsReceivedList } from "./RequestsReceivedList"
import { ApolloProvider } from "@apollo/client"
import blockStories from "../../data/storybook-blocks.json"
import { apolloClient } from "../index"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"

export default {
  title: "Lists",
  decorators: [
    (storyFn) => (
      <ApolloProvider client={apolloClient}>
        <DndProvider backend={Backend}>{storyFn()}</DndProvider>
      </ApolloProvider>
    ),
  ],
}

export const requestCatalog = () => <RequestCatalogList />
export const blockCatalog = () => <BlockCatalogList />
export const requestsMade = () => <RequestsMadeList />
export const requestsReceived = () => <RequestsReceivedList />

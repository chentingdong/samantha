import React from "react"
import { RequestCatalogList } from "./RequestCatalogList"
import { BlockCatalogList } from "./BlockCatalogList"
import { RequestsMadeList } from "./RequestsMadeList"
import { RequestsReceivedList } from "./RequestsReceivedList"
import { ApolloProvider } from "@apollo/client"
import blockStories from "../../../data/storybook-blocks.json"
import { getClient } from "../../index"

export default {
  title: "Blocks",
}

const client = getClient()

export const RequestCatalog = () => {
  return (
    <ApolloProvider client={client}>
      <RequestCatalogList />
    </ApolloProvider>
  )
}

export const BlockCatalog = () => {
  return (
    <ApolloProvider client={client}>
      <BlockCatalogList />
    </ApolloProvider>
  )
}

export const RequestsMade = () => {
  return (
    <ApolloProvider client={client}>
      <RequestsMadeList />
    </ApolloProvider>
  )
}

export const RequestsReceived = () => {
  return (
    <ApolloProvider client={client}>
      <RequestsReceivedList />
    </ApolloProvider>
  )
}

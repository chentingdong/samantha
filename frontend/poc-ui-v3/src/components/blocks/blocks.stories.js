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

const RequestCatalog = () => {
  return (
    <ApolloProvider client={client}>
      <RequestCatalogList />
    </ApolloProvider>
  )
}

const BlockCatalog = () => {
  return (
    <ApolloProvider client={client}>
      <BlockCatalogList />
    </ApolloProvider>
  )
}

const RequestsMade = () => {
  return (
    <ApolloProvider client={client}>
      <RequestsMadeList />
    </ApolloProvider>
  )
}

const RequestsReceived = () => {
  return (
    <ApolloProvider client={client}>
      <RequestsReceivedList />
    </ApolloProvider>
  )
}

export { RequestCatalog, BlockCatalog, RequestsMade, RequestsReceived }

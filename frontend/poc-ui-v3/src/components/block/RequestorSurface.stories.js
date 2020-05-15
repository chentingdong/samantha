import React from "react"
import { ResponderSurface } from "./ResponderSurface"
import { getClient } from "../../index"
import { ApolloProvider } from "@apollo/client"

export default {
  title: "Block / ResponderSurface",
}

const client = getClient()

export const ResponderSurfaceNormal = () => {
  return (
    <ApolloProvider client={client}>
      <ResponderSurface blockId={2} />
    </ApolloProvider>
  )
}

export const ResponderSurfaceError = () => {
  return (
    <ApolloProvider client={client}>
      <ResponderSurface blockId={-1} />
    </ApolloProvider>
  )
}

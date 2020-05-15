import React from "react"
import { ResponderSurface } from "./ResponderSurface"
import { getClient } from "../../index"
import { ApolloProvider } from "@apollo/client"

export default {
  title: "Block / ResponderSurface",
}

const client = getClient()

const ResponderSurfaceNormal = () => {
  return (
    <ApolloProvider client={client}>
      <ResponderSurface blockId={2} />
    </ApolloProvider>
  )
}

const ResponderSurfaceError = () => {
  return (
    <ApolloProvider client={client}>
      <ResponderSurface blockId={-1} />
    </ApolloProvider>
  )
}

export { ResponderSurfaceNormal, ResponderSurfaceError }

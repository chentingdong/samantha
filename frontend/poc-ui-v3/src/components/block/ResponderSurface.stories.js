import React from "react"
import { RequestorSurface } from "./RequestorSurface"
import { getClient } from "../../index"
import { ApolloProvider } from "@apollo/client"

export default {
  title: "Block / RequestorSurface",
}

const client = getClient()

const RequestorSurfaceNormal = () => {
  return (
    <ApolloProvider client={client}>
      <RequestorSurface blockId={2} />
    </ApolloProvider>
  )
}

const RequestorSurfaceError = () => {
  return (
    <ApolloProvider client={client}>
      <RequestorSurface blockId={-1} />
    </ApolloProvider>
  )
}

export { RequestorSurfaceNormal, RequestorSurfaceError }

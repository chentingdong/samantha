import React from "react"
import { render } from "react-dom"
import App from "./components/App"
import { Store } from "./context/store"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import config from "../configs/config"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client"

export function getClient() {
  const cache = new InMemoryCache()
  const link = new HttpLink(config.graphQL.HttpLink)

  return new ApolloClient({
    cache,
    link,
  })
}

const client = getClient()

const rootEl = document.getElementById("root")
render(
  <Store>
    <ApolloProvider client={client}>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </ApolloProvider>
  </Store>,
  rootEl
)

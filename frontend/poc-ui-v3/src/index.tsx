import React from "react"
import { render } from "react-dom"
import App from "./components/App"
import { Store } from "./context/store"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import config from "../configs/config"
import { cache } from "./cache"
import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client"

const link = new HttpLink(config.graphQL.HttpLink)

export const apolloClient = new ApolloClient({
  cache,
  link,
})

const rootEl = document.getElementById("root")

render(
  <Store>
    <ApolloProvider client={apolloClient}>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </ApolloProvider>
  </Store>,
  rootEl
)

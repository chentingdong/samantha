import React from "react"
import { render } from "react-dom"
import App from "./app/App"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import config from "../configs/config"
import { cache } from "./cache"
import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client"
import LogRocket from "logrocket"

LogRocket.init("z5hvnf/samantha")

const link = new HttpLink(config.graphQL.HttpLink)

export const apolloClient = new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
})

const rootEl = document.getElementById("root")

render(
  <ApolloProvider client={apolloClient}>
    <DndProvider backend={Backend}>
      <App />
    </DndProvider>
  </ApolloProvider>,
  rootEl
)

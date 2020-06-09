import React from "react"
import { render } from "react-dom"
import App from "./app/App"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import config from "../configs/config"
import { cache } from "./cache"
import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client"
import LogRocket from "logrocket"
import * as Sentry from "@sentry/browser"

Sentry.init({
  dsn:
    "https://351219521fd645b7a929d0f545fafff9@o405323.ingest.sentry.io/5270738",
})

LogRocket.init("z5hvnf/samantha")

LogRocket.getSessionURL((sessionURL) => {
  Sentry.configureScope((scope) => {
    scope.setExtra("sessionURL", sessionURL)
  })
})

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

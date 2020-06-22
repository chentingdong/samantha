import React from "react"
import { render } from "react-dom"
import App from "./app/App"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import config from "../configs/config"
import { cache } from "./cache"
import { ApolloClient, ApolloProvider, HttpLink, split } from "@apollo/client"
import { onError } from "@apollo/link-error"
import LogRocket from "logrocket"
import * as Sentry from "@sentry/browser"
import AppStyles from "./assets/styles/appStyles.tsx"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/link-ws"

if (process.env.NODE_ENV === "production") {
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
}

const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
  console.info(`[Error]: on operation ${operation.operationName}`)
  if (graphQLErrors)
    graphQLErrors.map(({ message, extensions: { path } }) =>
      console.info(`[GraphQL Error]: Message: ${message}, Path: ${path}`)
    )

  if (networkError) console.info(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink(config.graphQL.HttpLink)
const wsLink = new WebSocketLink(config.graphQL.WebSocketLink)
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

export const apolloClient = new ApolloClient({
  cache,
  link: errorLink.concat(splitLink),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
})

const rootEl = document.getElementById("root")

render(
  <ApolloProvider client={apolloClient}>
    <DndProvider backend={Backend}>
      <AppStyles>
        <App />
      </AppStyles>
    </DndProvider>
  </ApolloProvider>,
  rootEl
)

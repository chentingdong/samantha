import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from "cross-fetch"
import { onError } from "@apollo/link-error"

const link = onError(({ operation, graphQLErrors, networkError }) => {
  console.info(`[Error]: on operation ${operation.operationName}`)
  if (graphQLErrors)
    graphQLErrors.map(({ message, extensions: { path } }) =>
      console.info(`[GraphQL Error]: Message: ${message}, Path: ${path}`)
    )

  if (networkError) console.info(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: "http://localhost:8080/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "qcA.wmEfFzDpfzZZoepJs7gw",
  },
  fetch,
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link.concat(httpLink),
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

export default apolloClient

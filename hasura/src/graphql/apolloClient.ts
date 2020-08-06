import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from "cross-fetch"
import { onError } from "@apollo/link-error"

const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
  console.info(`[Error]: on operation ${operation.operationName}`)
  if (graphQLErrors)
    graphQLErrors.map(({ message, extensions: { path } }) =>
      console.info(`[GraphQL Error]: Message: ${message}, Path: ${path}`)
    )

  if (networkError) console.info(`[Network error]: ${networkError}`)
})

const hasuraGraphqlEndpoint =
  process.env.NODE_ENV === "development"
    ? "http://hasura:8080"
    : process.env.HASURA_GRAPHQL_ENDPOINT
const httpLink = new HttpLink({
  uri: `${hasuraGraphqlEndpoint}/v1/graphql`,
  headers: {
    "x-hasura-admin-secret": "qcA.wmEfFzDpfzZZoepJs7gw",
  },
  fetch,
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(httpLink),
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

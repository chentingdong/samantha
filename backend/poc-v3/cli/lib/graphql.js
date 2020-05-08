const fetch = require('node-fetch')
const { ApolloClient } = require('apollo-client')
const {
  InMemoryCache,
  NormalizedCacheObject,
} = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const gql = require('graphql-tag')

function getClient() {
  const cache = new InMemoryCache()
  const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiYWlqaSJ9.TG1mdxB0dbE6_aeD0WyQWUf1Pnwq4PeZ01Pp5eSv8p4',
    },
    fetch,
  })

  return new ApolloClient({
    cache: cache,
    link: link,
  })
}

const client = getClient()

module.exports.usersQuery = async () => {
  const { data } = await client.query({
    query: gql`
      query users {
        users {
          id
          name
          email
        }
      }
    `,
  })
  return data
}

module.exports.requestsMade = async ({ userId }) => {
  const { data } = await client.query({
    query: gql`
      query requestsMade($userId: String) {
        blocks(
          orderBy: { id: desc }
          where: {
            AND: [
              { inCatalog: { equals: false } }
              { requestors: { some: { id: { equals: $userId } } } }
            ]
          }
        ) {
          id
          name
          parent {
            id
          }
          state
          type
          requestors {
            name
          }
          responders {
            name
          }
        }
      }
    `,
    variables: { userId: userId },
  })
  return data
}

module.exports.requestsReceived = async ({ userId }) => {
  const { data } = await client.query({
    query: gql`
      query requestsReceived($userId: String) {
        blocks(
          orderBy: { id: desc }
          where: {
            AND: [
              { inCatalog: { equals: false } }
              { responders: { some: { id: { equals: $userId } } } }
            ]
          }
        ) {
          id
          name
          parent {
            id
          }
          state
          type
          requestors {
            name
          }
          responders {
            name
          }
        }
      }
    `,
    variables: { userId: userId },
  })
  return data
}

module.exports.requestCatalog = async () => {
  const { data } = await client.query({
    query: gql`
      query requestCatalog {
        blocks(
          orderBy: { id: desc }
          where: {
            AND: [
              { inCatalog: { equals: true } }
              {
                OR: [
                  { type: COMPOSITE_PARALLEL }
                  { type: COMPOSITE_SEQUENTIAL }
                ]
              }
            ]
          }
        ) {
          id
          name
          parent {
            id
          }
          state
          type
          inCatalog
          requestors {
            name
          }
          responders {
            name
          }
        }
      }
    `,
  })
  return data
}

module.exports.blockCatalog = async () => {
  const { data } = await client.query({
    query: gql`
      query blockCatalog {
        blocks(orderBy: { id: desc }, where: { inCatalog: { equals: true } }) {
          id
          name
          parent {
            id
          }
          state
          type
          inCatalog
          requestors {
            name
          }
          responders {
            name
          }
        }
      }
    `,
  })
  return data
}

module.exports.requestSurface = async ({ id }) => {
  const { data } = await client.query({
    query: gql`
      query requestSurface($id: Int) {
        block(where: { id: $id }) {
          id
          name
          parent {
            id
          }
          state
          type
          context
          children {
            id
            name
            state
            type
          }
          requestors {
            id
            name
          }
          responders {
            id
            name
          }
        }
      }
    `,
    variables: { id: id },
  })
  return data
}

module.exports.responseSurface = async ({ id }) => {
  const { data } = await client.query({
    query: gql`
      query responseSurface($id: Int) {
        block(where: { id: $id }) {
          id
          name
          parent {
            id
          }
          state
          type
          context
          children {
            id
            name
            state
            type
          }
          requestors {
            id
            name
          }
          responders {
            id
            name
          }
        }
      }
    `,
    variables: { id: id },
  })
  return data
}

module.exports.designSurface = async ({ id }) => {
  const { data } = await client.query({
    query: gql`
      query designSurface($id: Int) {
        block(where: { id: $id }) {
          id
          name
          type
          children {
            name
            type
          }
        }
      }
    `,
    variables: { id: id },
  })
  return data
}

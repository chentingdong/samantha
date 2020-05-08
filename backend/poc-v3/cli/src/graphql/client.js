const fetch = require('node-fetch')
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')

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

module.exports = getClient()

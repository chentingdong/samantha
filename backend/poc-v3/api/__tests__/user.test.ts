import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

describe('app', () => {
  let client: ApolloClient<NormalizedCacheObject>

  beforeAll(async () => {
    const cache = new InMemoryCache()
    const link = new HttpLink({
      uri: 'http://localhost:4000/graphql',
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiYWlqaSJ9.TG1mdxB0dbE6_aeD0WyQWUf1Pnwq4PeZ01Pp5eSv8p4',
      },
      fetch,
    })

    client = new ApolloClient({
      cache: cache,
      link: link,
    })
  })

  afterAll(async () => {
    client.stop()
  })

  it('users', async () => {
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
    console.log(data)
  })

  it('user', async () => {
    const { data } = await client.query({
      query: gql`
        query user($where: UserWhereUniqueInput!) {
          user(where: $where) {
            id
            name
            email
          }
        }
      `,
      variables: {
        where: {
          id: 'Google_111918078641246610063',
        },
      },
    })
    console.log(data)
  })
})

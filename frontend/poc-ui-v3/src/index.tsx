import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import { Store } from './components/context/store'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'

export function getClient() {
  const cache = new InMemoryCache()
  const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiYWlqaSJ9.TG1mdxB0dbE6_aeD0WyQWUf1Pnwq4PeZ01Pp5eSv8p4',
    },
  })

  return new ApolloClient({
    cache: cache,
    link: link,
  })
}

const client = getClient()

const rootEl = document.getElementById('root')
render(
  <ApolloProvider client={client}>
    <Store>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </Store>
  </ApolloProvider>,
  rootEl
)

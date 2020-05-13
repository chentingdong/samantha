import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import { Store } from './components/context/store'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';

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

const client = getClient();


const rootEl = document.getElementById('root')
render(
  <Store>
    <ApolloProvider client={client}>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </ApolloProvider>
  </Store>,
  rootEl
)

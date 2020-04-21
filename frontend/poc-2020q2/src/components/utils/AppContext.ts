import * as React from 'react'
import * as ReactDom from 'react-dom'

export interface AppContextInterface {
  user: object
  users: []
  currentBlock: object
  blocks: []
  blockDefinitions: []
  messages: []
  listUsers: () => []
  listBlocks: () => []
  listMessages: () => []
}

const ctxt = React.createContext<AppContextInterface | null>(null)

export const AppContextProvider = ctxt.Provider

export const AppContextConsumer = ctxt.Consumer

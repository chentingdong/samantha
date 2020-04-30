import React from 'react'
import 'regenerator-runtime/runtime.js'
import { reducer, Action } from './reducer'

type State = {
  isAuthenticated: boolean
  user: {}
  users: []
  currentBlock: {}
  blocks: []
  blockDefinitions: []
  messages: []
  uiComponent: {
    showCreateRequestDef: boolean
  }
}

const initialState: State = {
  isAuthenticated: false,
  user: {},
  users: [],
  currentBlock: {},
  blocks: [],
  blockDefinitions: [],
  messages: [],
  uiComponent: {
    showCreateRequestDef: false,
  },
}

const Store: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

const Context = React.createContext<{
  state: State
  dispatch: (action: Action) => void
}>({
  state: initialState,
  dispatch: () => {},
})

export { State, initialState, Context, Store, Action }

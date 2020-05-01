import React from 'react'
import 'regenerator-runtime/runtime.js'
import { reducer, Action } from './reducer'

interface State {
  isAuthenticated: boolean
  user: object
  users: object[]
  currentBlock: object
  blocks: object[]
  blockDefinitions: object[]
  messages: object[]
  uiState: object
}

const initialState: State = {
  isAuthenticated: false,
  user: {},
  users: [],
  currentBlock: {},
  blocks: [],
  blockDefinitions: [],
  messages: [],
  uiState: {
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

export { State, initialState, Context, Store }

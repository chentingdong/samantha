import React from 'react'
import 'regenerator-runtime/runtime.js'
import { reducer, Action } from './reducer'

interface RequestDef {
  id: string
  name: string
  description: string
  requester?: string
  responders?: string[]
  blocks: object[]
}

interface BlockDef {
  id: string
  name: string
  description: string
  requester?: string
  responders?: string[]
  form?: object
}

interface UiState {
  showCreateRequestDef: boolean
}

interface State {
  isAuthenticated: boolean
  user: object
  users?: object[]
  currentRequest?: RequestDef
  requestDefs?: RequestDef[]
  currentBlock?: BlockDef
  blockDefs?: BlockDef[]
  messages?: object[]
  uiState?: UiState
}

const initialState: State = {
  isAuthenticated: false,
  user: {},
  users: [],
  currentRequest: {
    id: '',
    name: '',
    description: '',
    requester: '',
    responders: [],
    blocks: [],
  },
  requestDefs: [],
  currentBlock: {
    id: '',
    name: '',
    description: '',
    requester: '',
    responders: [],
  },
  blockDefs: [],
  messages: [],
  uiState: {
    showCreateRequestDef: true,
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

export { State, UiState, initialState, Context, Store, RequestDef, BlockDef }

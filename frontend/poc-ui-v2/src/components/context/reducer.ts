import React from 'react'
import { State, initialState, UiState, RequestDef, BlockDef } from './store'

type Action =
  | { type: 'authenticate'; isAuthenticated: boolean }
  | { type: 'setUser'; user: object }
  | { type: 'setUsers'; users: object[] }
  | { type: 'setUiState'; uiState: UiState }
  | { type: 'saveRequestDefs'; requestDefs: RequestDef[] }
  | { type: 'saveBlockDefs'; blockDefs: BlockDef[] }

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'authenticate':
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      }
    case 'setUser':
      return {
        ...state,
        user: action.user,
      }
    case 'setUsers':
      return {
        ...state,
        users: action.users,
      }
    case 'setUiState':
      return {
        ...state,
        uiState: action.uiState,
      }
    case 'saveRequestDefs':
      return {
        ...state,
        currentRequestDef: {},
        requestDefs: action.requestDefs,
      }
    case 'saveBlockDefs':
      return {
        ...state,
        blockDefs: action.blockDefs,
      }
    default:
      return state
  }
}

export { reducer, Action }

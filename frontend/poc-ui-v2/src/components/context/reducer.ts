import React from 'react'
import { State, UiState, RequestDef, BlockDef } from './interface'
import { initialState } from './store'

// TODO: rewrite this when make sense.
type Action =
  | { type: 'authenticate'; isAuthenticated: boolean }
  | { type: 'setUser'; user: object }
  | { type: 'setUsers'; users: object[] }
  | { type: 'setUiState'; uiState: UiState }
  | { type: 'saveRequestDefs'; requestDefs: RequestDef[] }
  | { type: 'saveCurrentRequest'; currentRequest: RequestDef }
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
    case 'saveCurrentRequest':
      return {
        ...state,
        currentRequest: action.currentRequest,
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

import React from 'react'
import { State } from './interface'

type Action =
  | { type: 'authenticate'; isAuthenticated: boolean }
  | { type: 'set'; data: object }
  | { type: 'setUi'; data: object }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'authenticate':
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      }
    case 'set':
      return Object.assign({}, state, action.data)
    case 'setUi':
      return Object.assign({}, state, {
        uiState: Object.assign({}, state.uiState, action.data),
      })
    default:
      return state
  }
}

export { reducer, Action }

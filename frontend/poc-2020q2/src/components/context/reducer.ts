import React from 'react'
import { State, initialState } from './store'

type Action =
  | { type: 'authenticate'; isAuthenticated: boolean }
  | { type: 'setUser'; user: object }
  | { type: 'setUsers'; users: [] }

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
    default:
      return state
  }
}

export { reducer, Action }

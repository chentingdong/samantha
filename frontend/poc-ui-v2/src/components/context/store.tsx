import React from 'react'
import 'regenerator-runtime/runtime.js'
import { reducer, Action } from './reducer'
import { State } from './interface'
import initialState from '../../../data/initialState.json'

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

export { Context, Store }

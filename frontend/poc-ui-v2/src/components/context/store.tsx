import React from 'react'
import 'regenerator-runtime/runtime.js'
import { reducer, Action } from './reducer'
import { State } from './interface'
import blockDefs from '../../../data/blockDefs.json'
import requestDefs from '../../../data/requestDefs.json'
import initialState from '../../../data/initialState.json'
import user from '../../../data/user.json'
import users from '../../../data/users.json'

const Store: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    dispatch({ type: 'saveRequestDefs', requestDefs: requestDefs })
    dispatch({ type: 'saveBlockDefs', blockDefs: blockDefs })
  }, [])

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

export { Context, Store, initialState }

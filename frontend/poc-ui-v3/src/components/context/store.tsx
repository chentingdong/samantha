import React from 'react'
import 'regenerator-runtime/runtime.js'
import { reducer, Action } from './reducer'
import { State } from './interface'
import initialState from '../../../data/initialState.json'
import blockDefs from '../../../data/blockDefs.json'
import requestDefs from '../../../data/requestDefs.json'
import requests from '../../../data/requests.json'
import user from '../../../data/user.json'
import users from '../../../data/users.json'

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  React.useEffect(() => {
    dispatch({ type: 'set', data: { requestDefs: requestDefs } })
    dispatch({ type: 'set', data: { blockDefs: blockDefs } })
    dispatch({ type: 'set', data: { requests: requests } })
    dispatch({ type: 'set', data: { user: user } })
    dispatch({ type: 'set', data: { users: users } })
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

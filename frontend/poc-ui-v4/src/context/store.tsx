import React, { useReducer } from "react"
import "regenerator-runtime/runtime.js"
import { reducer, Action } from "./reducer"
import { State } from "../models/interface"
import initialState from "../../data/initialState.json"

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

const Context = React.createContext<{
  state: State
  dispatch: (action: Action) => void
}>({
  state: initialState,
  dispatch: () => {
    // empty
  },
})

export { Context, Store, initialState }

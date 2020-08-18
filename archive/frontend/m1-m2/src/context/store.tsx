import "regenerator-runtime/runtime.js"

import {Action, reducer} from "./reducer"
import React, {useReducer} from "react"

import {State} from "models/interface"
import {state as initialState} from "../../data/state"

const Store = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
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

export {Context, Store, initialState}

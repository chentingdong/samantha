import React from "react"
import { State } from "../models/interface"
import { initialState } from "./store"

type Action =
  | { type: "authenticate", isAuthenticated: boolean }
  | { type: "set", data: object }
  | { type: "setUi", data: object }
  | { type: "resetUi" }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "authenticate":
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      }
    case "set":
      return Object.assign({}, state, action.data)
    case "setUi":
      return Object.assign({}, state, {
        uiState: Object.assign({}, state.uiState, action.data),
      })
    case "resetUi":
      return Object.assign({}, state, {
        uiState: initialState.uiState,
      })
    default:
      return state
  }
}

export { reducer, Action }

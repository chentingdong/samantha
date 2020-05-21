import { State } from "../models/interface"
import { initialState } from "./store"

type Action =
  | { type: "set"; data: object }
  | { type: "setUi"; data: object }
  | { type: "resetUi" }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
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

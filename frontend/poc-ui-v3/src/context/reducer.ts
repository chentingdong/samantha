import { State } from "../models/interface"

type Action = { type: "set"; data: object }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set":
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

export { reducer, Action }

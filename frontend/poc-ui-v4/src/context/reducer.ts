import { State } from "../models/interface"

type Action = {
  type: "set"
  data: any
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set":
      return { ...state, ...action.data }
    default:
      return state
  }
}

export { reducer, Action }

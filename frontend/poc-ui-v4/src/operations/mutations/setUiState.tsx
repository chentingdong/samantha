import { uiStateVar } from "../../cache"

const setUiState = (incoming) => {
  const newUiState = { ...uiStateVar(), ...incoming }
  uiStateVar(newUiState)
}

export { setUiState }

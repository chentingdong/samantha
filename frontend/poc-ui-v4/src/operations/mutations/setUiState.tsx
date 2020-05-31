import { uiStateVar } from "../../cache"
import { UiState } from "../../models/interface"

const setUiState = (incoming: UiState) => {
  const oldUiState = uiStateVar()
  const newUiState = {
    ...oldUiState,
    ...incoming,
    draftBlock: { ...oldUiState.draftBlock, ...incoming.draftBlock },
  }
  uiStateVar(newUiState)
}

export { setUiState }

import { uiStateVar } from "../../cache"
import { UiState } from "../../models/interface"
import { initialBlock } from "../../../data/block"

const setUiState = (incoming: any, reset = false) => {
  const oldUiState = uiStateVar()
  const newUiState = {
    ...oldUiState,
    ...incoming,
    draftBlock: {
      ...(reset ? initialBlock : oldUiState.draftBlock),
      ...incoming.draftBlock,
    },
  }
  uiStateVar(newUiState)
}

const resetUiState = () => {
  const states = {
    currentBellhopId: null,
    currentBellDefId: null,
    currentBlockId: null,
    runningBellId: null,
    showNotification: null,
  }
  setUiState(states)
}

export { setUiState, resetUiState }

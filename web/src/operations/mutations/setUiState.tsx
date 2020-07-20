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

export { setUiState }

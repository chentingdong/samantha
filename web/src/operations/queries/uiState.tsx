import { gql } from "@apollo/client"

export const UI_STATE = gql`
  query {
    uiState @client {
      showEditor
      editorMode
      editingTypename
      draftBlock
      showBellEditor
      currentBellhopId
      currentBellDefId
      runningBellId
      currentBlockId
      showNotification
      mainMenuActiveItem
    }
  }
`

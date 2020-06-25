import { gql } from "@apollo/client"

export const UI_STATE = gql`
  query {
    uiState @client {
      showEditor
      editorMode
      editingTypename
      draftBlock
      showBlockEditor
      currentBlockId
    }
  }
`

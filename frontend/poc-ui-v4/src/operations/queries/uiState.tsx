import { gql } from "@apollo/client"

export const UI_STATE = gql`
  query {
    uiState @client {
      showEditor
      editorMode
      editingTypename
      draftBlock {
        id
        name
        description
        type
        state
        control
        context
        parent {
          id
          name
          state
          type
        }
        children {
          id
          name
          description
          type
          state
          control
          context
          children {
            id
            name
            description
            type
            state
            control
            context
            children {
              id
              name
              description
              type
              state
              control
              context
            }
          }
        }
        requestors {
          id
          name
        }
        responders {
          id
          name
        }
      }
    }
  }
`

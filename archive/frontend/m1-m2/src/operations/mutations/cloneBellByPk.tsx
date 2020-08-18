import { gql } from "@apollo/client"

export const CLONE_BELL_BY_PK = gql`
  mutation clone_bell_by_pk(
    $id: String!
    $is_definition: Boolean = false
    $start_on_create: Boolean = true
  ) {
    action: clone_m2_bells_by_pk(
      is_definition: $is_definition
      pk_columns: { id: $id }
    )
  }
`

import { blockFullFragment } from "../fragments/block"
import { gql } from "@apollo/client"

export const COMPLETE_TASK = gql`
  mutation update_blocks_by_pk($id: String!) {
    update_m2_blocks_by_pk(pk_columns: { id: $id }, _set: { state: Success }) {
      id
      state
    }
  }
`

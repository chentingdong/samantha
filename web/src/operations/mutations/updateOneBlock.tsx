import { gql } from "@apollo/client"
import { blockFullFragmentM1, blockFullFragment } from "../fragments/block"
export const UPDATE_ONE_BLOCK_M1 = gql`
  mutation update_blocks($data: blocks_set_input, $id: String) {
    update_blocks(_set: $data, where: { id: { _eq: $id } }) {
      returning {
        ...blockFullFragmentM1
      }
    }
  }
  ${blockFullFragmentM1}
`
export const COMPLETE_TASK = gql`
  mutation update_blocks_by_pk($id: String!) {
    update_m2_blocks_by_pk(pk_columns: { id: $id }, _set: { state: Success })
  }
`

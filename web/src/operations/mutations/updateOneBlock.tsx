import { gql } from "@apollo/client"
import { blockFullFragmentM1 } from "../fragments/block"
export const UPDATE_ONE_BLOCK = gql`
  mutation update_blocks($data: blocks_set_input, $id: String) {
    update_blocks(_set: $data, where: { id: { _eq: $id } }) {
      returning {
        ...blockFullFragmentM1
      }
    }
  }
  ${blockFullFragmentM1}
`

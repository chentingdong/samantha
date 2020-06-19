import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"
export const UPDATE_ONE_BLOCK = gql`
  mutation update_blocks($data: blocks_set_input, $where: blocks_bool_exp!) {
    update_blocks(_set: $data, where: $where) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`

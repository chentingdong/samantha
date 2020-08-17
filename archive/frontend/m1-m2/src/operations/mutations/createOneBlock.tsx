import { gql } from "@apollo/client"
import { blockFullFragmentM1 } from "../fragments/block"
export const CREATE_ONE_BLOCK = gql`
  mutation insert_blocks_one($data: blocks_insert_input!) {
    insert_blocks_one(object: $data) {
      ...blockFullFragmentM1
    }
  }
  ${blockFullFragmentM1}
`

import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"

export const CREATE_ONE_BLOCK_DEF = gql`
  mutation insert_blockDefs_one($data: blockDefs_insert_input!) {
    insert_blockDefs_one(object: $data) {
      ...blockDefFullFragment
    }
  }
  ${blockDefFullFragment}
`

import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"
export const DELETE_ONE_BLOCK_DEF = gql`
  mutation delete_blockDefs_by_pk($id: String!) {
    delete_blockDefs_by_pk(id: $id) {
      id
    }
  }
`

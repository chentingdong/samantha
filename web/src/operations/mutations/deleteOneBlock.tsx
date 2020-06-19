import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"
export const DELETE_ONE_BLOCK = gql`
  mutation delete_blocks_by_pk($id: String!) {
    delete_blocks_by_pk(id: $id) {
      id
    }
  }
`

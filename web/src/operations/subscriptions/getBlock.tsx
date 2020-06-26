import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"

export const GET_BLOCK = gql`
  subscription blocks_by_pk($id: String!) {
    blocks_by_pk(id: $id) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`

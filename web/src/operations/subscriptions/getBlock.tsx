import { gql } from "@apollo/client"
import { blockFullFragmentM1, blockFullFragment } from "../fragments/block"

export const GET_BLOCK_M1 = gql`
  subscription blocks_by_pk($id: String!) {
    blocks_by_pk(id: $id) {
      ...blockFullFragmentM1
    }
  }
  ${blockFullFragmentM1}
`

export const GET_BLOCK = gql`
  subscription blocks_by_pk($id: String!) {
    m2_blocks_by_pk(id: $id) {
      ...blockFullFragmentM1
    }
  }
  ${blockFullFragment}
`

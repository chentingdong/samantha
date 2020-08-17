import { blockFullFragment, blockFullFragmentM1 } from "../fragments/block"

import { gql } from "@apollo/client"

export const GET_BLOCK = gql`
  subscription blocks_by_pk($id: String!) {
    m2_blocks_by_pk(id: $id) {
      ...blockFullFragmentM1
    }
  }
  ${blockFullFragment}
`

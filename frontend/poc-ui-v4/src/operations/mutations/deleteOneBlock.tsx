import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"
export const DELETE_ONE_BLOCK = gql`
  mutation deleteOneBlock($where: BlockWhereUniqueInput!) {
    deleteOneBlock(where: $where) {
      id
    }
  }
`

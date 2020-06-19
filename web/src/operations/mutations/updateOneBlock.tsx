import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"
export const UPDATE_ONE_BLOCK = gql`
  mutation updateOneBlock(
    $data: BlockUpdateInput!
    $where: BlockWhereUniqueInput!
  ) {
    updateOneBlock(data: $data, where: $where) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`

import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"

export const COMPLETE_ONE_BLOCK = gql`
  mutation completeOneBlock(
    $data: BlockUpdateInput!
    $where: BlockWhereUniqueInput!
  ) {
    updateOneBlock(data: $data, where: $where) {
      ...BlockFullFragment
    }
  }
  ${BlockFullFragment}
`

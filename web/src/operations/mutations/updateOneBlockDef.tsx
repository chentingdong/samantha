import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"
export const UPDATE_ONE_BLOCK_DEF = gql`
  mutation updateOneBlockDef(
    $data: BlockDefUpdateInput!
    $where: BlockDefWhereUniqueInput!
  ) {
    updateOneBlockDef(data: $data, where: $where) {
      ...blockDefFullFragment
    }
  }
  ${blockDefFullFragment}
`

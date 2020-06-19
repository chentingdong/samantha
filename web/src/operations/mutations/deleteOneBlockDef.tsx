import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"
export const DELETE_ONE_BLOCK_DEF = gql`
  mutation deleteOneBlockDef($where: BlockDefWhereUniqueInput!) {
    deleteOneBlockDef(where: $where) {
      id
    }
  }
`

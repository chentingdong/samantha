import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"

export const CREATE_ONE_BLOCK_DEF = gql`
  mutation createOneBlockDef($data: BlockDefCreateInput!) {
    createOneBlockDef(data: $data) {
      ...blockDefFullFragment
    }
  }
  ${blockDefFullFragment}
`

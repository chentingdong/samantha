import { gql } from "@apollo/client"
import { BlockDefFullFragment } from "../fragments/blockDef"

export const CREATE_ONE_BLOCK_DEF = gql`
  mutation createOneBlockDef($data: BlockDefCreateInput!) {
    createOneBlockDef(data: $data) {
      ...BlockDefFullFragment
    }
  }
  ${BlockDefFullFragment}
`

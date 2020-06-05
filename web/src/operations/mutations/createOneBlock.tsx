import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"
export const CREATE_ONE_BLOCK = gql`
  mutation createOneBlock($data: BlockCreateInput!) {
    createOneBlock(data: $data) {
      ...BlockFullFragment
    }
  }
  ${BlockFullFragment}
`

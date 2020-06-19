import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"
export const UPDATE_ONE_BLOCK_DEF = gql`
  mutation update_blockDefs($data: blockDefs_set_input, $id: String) {
    update_blockDefs(_set: $data, where: { id: { _eq: $id } }) {
      returning {
        ...blockDefFullFragment
      }
    }
  }
  ${blockDefFullFragment}
`

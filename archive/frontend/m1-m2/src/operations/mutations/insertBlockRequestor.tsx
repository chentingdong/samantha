import { gql } from "@apollo/client"
export const INSERT_BLOCK_REQUESTOR = gql`
  mutation insert_block_requestor_one($object: block_requestor_insert_input!) {
    insert_block_requestor_one(object: $object) {
      block {
        requestors {
          user_id
        }
      }
      block_id
      user_id
    }
  }
`

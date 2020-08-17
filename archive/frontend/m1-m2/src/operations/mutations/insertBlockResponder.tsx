import { gql } from "@apollo/client"
export const INSERT_BLOCK_RESPONDER = gql`
  mutation insert_block_responder_one($object: block_responder_insert_input!) {
    insert_block_responder_one(object: $object) {
      block {
        responders {
          user_id
        }
      }
      block_id
      user_id
    }
  }
`

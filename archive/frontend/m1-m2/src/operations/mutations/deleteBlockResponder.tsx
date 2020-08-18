import { gql } from "@apollo/client"
export const DELETE_BLOCK_RESPONDER = gql`
  mutation delete_block_responder_by_pk($block_id: String!, $user_id: String!) {
    delete_block_responder_by_pk(block_id: $block_id, user_id: $user_id) {
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

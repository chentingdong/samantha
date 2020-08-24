import { gql } from "@apollo/client"
import { messageFragment } from "operations/fragments/message"

export const SEND_A_MESSAGE = gql`
  mutation insert_chat_messages_one($object: chat_messages_insert_input!) {
    insert_chat_messages_one(object: $object) {
      ...messageFragment
    }
  }
  ${messageFragment}
`

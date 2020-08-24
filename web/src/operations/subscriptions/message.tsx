import { gql } from "@apollo/client"
import { messageFragment } from "operations/fragments/message"

export const ROOM_MESSAGES = gql`
  subscription chat_messages($roomId: String!) {
    chat_messages(
      order_by: { created_at: asc }
      where: { room_id: { _eq: $roomId } }
    ) {
      ...messageFragment
    }
  }
  ${messageFragment}
`

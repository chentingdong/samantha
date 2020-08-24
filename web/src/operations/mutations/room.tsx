import { gql } from "@apollo/client"
import { roomFragment } from "operations/fragments/room"

export const BOOK_A_ROOM = gql`
  mutation insert_chat_rooms_one(
    $source: chat_room_sources_enum!
    $sourceId: String!
    $roomName: String!
    $user_room_participations: [chat_user_room_participations_insert_input!]!
  ) {
    insert_chat_rooms_one(
      object: {
        source: $source
        id: $sourceId
        name: $roomName
        user_room_participations: {
          data: $user_room_participations
          on_conflict: {
            constraint: user_room_participations_pkey
            update_columns: [role]
          }
        }
      }
      on_conflict: { constraint: rooms_pkey, update_columns: last_visited_at }
    ) {
      ...roomFragment
    }
  }
  ${roomFragment}
`

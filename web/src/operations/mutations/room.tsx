import { gql } from "@apollo/client"
import { userRoomParticipations } from "operations/fragments/user"

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
      id
      source
      name
      created_at
      ended_at
      last_post_at
      last_visited_at
      user_room_participations {
        ...userRoomParticipations
      }
    }
  }
  ${userRoomParticipations}
`

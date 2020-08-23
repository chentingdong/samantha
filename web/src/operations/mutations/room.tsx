import { gql } from "@apollo/client"
import { userRoomParticipations } from "operations/fragments/user"

export const BOOK_A_ROOM = gql`
  mutation insert_chat_rooms_one(
    $source: chat_room_sources_enum!
    $sourceId: String!
    $roomName: String!
    $user_room_participations: [chat_user_room_participations_insert_input!]!
  ) {
    insert_chat_room_bookings_one(
      on_conflict: {
        constraint: room_bookings_pkey
        update_columns: visit_count
      }
      object: {
        source: $source
        source_id: $sourceId
        room: {
          data: {
            id: $sourceId
            name: $roomName
            type: "chat"
            user_room_participations: {
              data: $user_room_participations
              on_conflict: {
                constraint: user_room_participations_pkey
                update_columns: last_seen_at
              }
            }
          }
          on_conflict: {
            constraint: rooms_pkey
            update_columns: last_visited_at
          }
        }
      }
    ) {
      source
      source_id
      created_at
      room {
        type
        name
        id
        created_at
        last_post_at
        ended_at
        last_visited_at
        user_room_participations {
          ...userRoomParticipations
        }
      }
    }
  }
  ${userRoomParticipations}
`

import { gql } from "@apollo/client"

export const BOOK_A_BELL_ROOM = gql`
  mutation insert_chat_rooms_one(
    $bellId: String
    $roomId: String
    $roomName: String
    $user_room_participations: [chat_user_room_participations_insert_input!]!
  ) {
    insert_chat_bell_room_bookings_one(
      on_conflict: {
        constraint: bell_room_bookings_pkey
        update_columns: created_at
      }
      object: {
        bell_id: $bellId
        room: {
          data: {
            id: $roomId
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
      room_id
      bell_id
      created_at
      id
      room {
        type
        name
        id
        created_at
        last_post_at
        ended_at
        last_visited_at
        user_room_participations {
          id
          joined_at
          last_seen_at
          role
          user_id
        }
      }
    }
  }
`

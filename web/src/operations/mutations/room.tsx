import { gql } from "@apollo/client"

export const BOOK_A_BELL_ROOM = gql`
  mutation insert_chat_rooms_one(
    $id: String
    $name: String
    $user_room_participations: [chat_user_room_participations_insert_input!]!
    $bell_room_bookings: [chat_bell_room_bookings_insert_input!]!
  ) {
    insert_chat_rooms_one(
      on_conflict: { constraint: rooms_pkey, update_columns: [name] }
      object: {
        id: $id
        name: $name
        user_room_participations: {
          data: $user_room_participations
          on_conflict: {
            constraint: user_room_participations_pkey
            update_columns: role
          }
        }
        bell_room_bookings: {
          data: $bell_room_bookings
          on_conflict: {
            constraint: bell_room_bookings_pkey
            update_columns: created_at
          }
        }
      }
    ) {
      id
      name
      type
      created_at
      last_post_at
      ended_at
      user_room_participations {
        user_id
        room_id
      }
      bell_room_bookings {
        id
        room_id
        bell_id
        created_at
      }
    }
  }
`

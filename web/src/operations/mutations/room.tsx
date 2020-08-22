import { gql } from "@apollo/client"

export const BOOK_A_BELL_ROOM = gql`
  mutation insert_chat_bell_room_bookings_one($object: jsonb) {
    insert_chat_bell_room_bookings_one(object: $object) {
      id
      name
      room_id
      bell_id
      user_room_participations {
        role
        joined_at
        user_id
      }
    }
  }
`

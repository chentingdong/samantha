import { gql } from "@apollo/client"
import { messageFragment } from "./message"
import { userFragment } from "./user"

const userRoomParticipationsFragment = gql`
  fragment userRoomParticipations on chat_user_room_participations {
    room_id
    joined_at
    last_seen_at
    last_typed_at
    role
    user {
      ...userFragment
    }
  }
  ${userFragment}
`

const roomFragment = gql`
  fragment roomFragment on chat_rooms {
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
    messages {
      ...messageFragment
    }
  }
  ${userRoomParticipationsFragment}
  ${messageFragment}
`

export { roomFragment, userRoomParticipationsFragment }

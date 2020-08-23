import { gql } from "@apollo/client"

const userFragment = gql`
  fragment userFragment on m2_users {
    id
    name
    email
    family_name
    given_name
    picture
  }
`

const userRoomParticipations = gql`
  fragment userRoomParticipations on chat_user_room_participations {
    id
    joined_at
    role
    user {
      ...userFragment
    }
  }
  ${userFragment}
`

export { userFragment, userRoomParticipations }

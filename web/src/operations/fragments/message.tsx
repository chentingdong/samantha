import { gql } from "@apollo/client"
import { userFragment } from "./user"

const messageFragment = gql`
  fragment messageFragment on chat_messages {
    id
    content
    from_user_id
    user {
      ...userFragment
    }
    to_user_id
    type
    created_at
  }
  ${userFragment}
`

export { messageFragment }

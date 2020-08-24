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

export { userFragment }

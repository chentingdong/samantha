import { gql } from "@apollo/client"

export const m2UserFragment = gql`
  fragment m2UserFragment on m2_users {
    id
    name
    email
    family_name
    given_name
    picture
  }
`

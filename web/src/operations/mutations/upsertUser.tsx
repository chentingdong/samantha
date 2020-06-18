import { gql } from "@apollo/client"

export const UPSERT_USER = gql`
  mutation upsert_User($objects: [User_insert_input!]!) {
    insert_User(
      objects: $objects
      on_conflict: { constraint: User_pkey, update_columns: [name, email] }
    ) {
      returning {
        id
        name
        email
      }
    }
  }
`

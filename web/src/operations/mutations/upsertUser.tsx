import { gql } from "@apollo/client"

export const UPSERT_USER = gql`
  mutation upsert_user($object: User_insert_input!) {
    insert_user(
      object: $object
      on_conflict: { constraint: users_pkey, update_columns: [name, email] }
    ) {
      returning {
        id
        name
        email
      }
    }
  }
`

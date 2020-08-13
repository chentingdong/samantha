import {gql} from "@apollo/client"

export const UPSERT_USER = gql`
  mutation upsert_users_one($object: m2_users_insert_input!) {
    insert_m2_users_one(
      object: $object
      on_conflict: {
        constraint: users_pkey
        update_columns: [name, email, family_name, given_name, picture]
      }
    ) {
      id
      name
      email
      family_name
      given_name
      picture
    }
  }
`

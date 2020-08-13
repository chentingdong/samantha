import {gql} from "@apollo/client"

export const ADD_FOLLOWER = gql`
mutation update_bells($user_id: String, $bell_id: String, $role: String) {
  insert_m2_user_bell_participations(
    objects: {
      bell_id: $bell_id,
      role: 'bell_follower',
      user_id: $user_id
    }
  )
`

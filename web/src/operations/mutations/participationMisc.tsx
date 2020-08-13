import {gql} from "@apollo/client"

export const ADD_FOLLOWER = gql`
mutation update_bells($data: bells_set_input, $id: String) {
    update_bells(_set: $data, where: { id: { _eq: $id } }) {
      returning {
        id
        user_participations
      }
    }
  }
`

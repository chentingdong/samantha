import {bellFragment} from "../fragments/bell"
import {gql} from "@apollo/client"
export const UPDATE_ONE_BELL = gql`
  mutation update_bells($data: bells_set_input, $id: String) {
    update_bells(_set: $data, where: { id: { _eq: $id } }) {
      returning {
        ...bellFragment
      }
    }
  }
  ${bellFragment}
`


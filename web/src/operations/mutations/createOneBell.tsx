import { bellFragment } from "operations/fragments/bell"
import { gql } from "@apollo/client"

export const CREATE_ONE_BELL = gql`
  mutation insert_bells_one($data: bells_insert_input!) {
    insert_bells_one(object: $data) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

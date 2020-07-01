import apolloClient from "@apollo/client"
import { gql } from "@apollo/client"
import { bellFragment } from "../fragments/bell"

export const CREATE_ONE_BELL = gql`
  mutation insert_bells_one($data: bells_insert_input!) {
    insert_bells_one(object: $data) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

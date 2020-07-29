import { gql } from "@apollo/client"
import { bellFragment } from "../fragments/bell"

export const GET_BELL = gql`
  subscription bells_by_pk($id: String!) {
    m2_bells_by_pk(id: $id) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

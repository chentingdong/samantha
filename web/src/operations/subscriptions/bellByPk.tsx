import { bellFragment } from "../fragments/bell"
import { gql } from "@apollo/client"

export const BELL_BY_PK = gql`
  subscription bells_by_pk($id: String!) {
    m2_bells_by_pk(id: $id) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

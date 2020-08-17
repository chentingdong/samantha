import { gql } from "@apollo/client"
import { bellFragment } from "operations/fragments/bell"

export const BELL_SEARCH = gql`
  query bells($search: String) {
    m2_bells(where: { name: { _ilike: $search } }) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

import { gql } from "@apollo/client"
import { bellFragmentM1 } from "../fragments/bell"

export const BELLS_BY_PK = gql`
  query bells_by_pk($id: String) {
    bells(
      where: { id: { _eq: $id } }
      order_by: { created_at: asc_nulls_last }
    ) {
      ...bellFragment
    }
  }
  ${bellFragmentM1}
`

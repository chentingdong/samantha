import {gql} from "@apollo/client"
import {bellhopFragment} from "operations/fragments/bellhop"

export const BELLHOP_SEARCH = gql`
  query bellhop_search($search: String) {
    m2_bellhops(where: { name: { _ilike: $search } }) {
      ...bellhopFragment
    }
  }
  ${bellhopFragment}
`

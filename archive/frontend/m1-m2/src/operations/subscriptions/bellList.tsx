// bellList.tsx
import {gql} from "@apollo/client"
import {bellFragment} from "operations/fragments/bell"

export const BELL_LIST = gql`
  subscription bells {
    m2_bells(
      order_by: { started_at: desc },
      where: {is_definition: {_eq: false}}
    ) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

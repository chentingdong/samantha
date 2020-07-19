// bellCatalog.tsx
import { gql } from "@apollo/client"
import { bellFragment } from "operations/fragments/bell"

export const BELLS_LIST = gql`
  subscription bells {
    bells(order_by: { started_at: desc }) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

// bellCatalog.tsx
import { gql } from "@apollo/client"
import { bellFragment } from "operations/fragments/bell"

export const BELL_CATALOG = gql`
  subscription bellsCatalog {
    m2_bells(order_by: { updated_at: desc }) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

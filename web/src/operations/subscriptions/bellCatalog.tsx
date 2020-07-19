// bellCatalog.tsx
import { gql } from "@apollo/client"
import { bellFragment } from "operations/fragments/bell"

export const BELL_CATALOG = gql`
  subscription bellsCatalog {
    bells(order_by: { last_updated: desc }) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

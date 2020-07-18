// bellCagalog.tsx
import { gql } from "@apollo/client"
import { bellFragment } from "operations/fragments/bell"

export const BELL_CATALOG = gql`
  query bellCatalog {
    bells(order_by: { created_at: desc_nulls_first }) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

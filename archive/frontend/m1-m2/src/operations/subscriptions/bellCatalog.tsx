import { bellFragment } from "operations/fragments/bell"
// bellCatalog.tsx
import { gql } from "@apollo/client"

export const BELL_CATALOG = gql`
  subscription bellsCatalog {
    m2_bells(
      order_by: { updated_at: desc }
      where: { is_definition: { _eq: true } }
    ) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

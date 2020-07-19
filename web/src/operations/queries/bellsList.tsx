// bellCatalog.tsx
import { gql } from "@apollo/client"
import { bellFragment } from "operations/fragments/bell"

export const BELLS_LIST = gql`
  query bells {
    bells(order_by: { created_at: desc_nulls_first }) {
      ...bellFragment
    }
  }
  ${bellFragment}
`

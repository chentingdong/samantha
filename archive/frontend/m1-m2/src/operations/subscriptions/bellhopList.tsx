// bellhopFragment.ts
import { gql } from "@apollo/client"
import { bellhopFragment } from "operations/fragments/bellhop"

export const BELLHOP_LIST = gql`
  subscription bellhops {
    m2_bellhops(order_by: { created_at: desc }) {
      ...bellhopFragment
    }
  }
  ${bellhopFragment}
`

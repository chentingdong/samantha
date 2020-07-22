import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { bellhopFragment } from "../fragments/bellhops"

export const getBellhops = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query bellhops {
        m2_bellhops(order_by: { name: desc_nulls_first }) {
          ...bellhopFragment
        }
      }
      ${bellhopFragment}
    `,
  })
  if (errors) return undefined
  return data.m2_bellhops
}

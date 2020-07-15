import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { bellFragment } from "../fragments/bells"

export const getBells = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query bells {
        bells(order_by: { last_updated: desc }) {
          ...bellFragment
        }
      }
      ${bellFragment}
    `,
  })
  if (errors) return
  return data.bells
}

import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { mainBellFragment } from "../fragments/mainBells"

export const getMainBells = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query main_bells {
        m2_bells(
          order_by: { created_at: asc }
          where: { acts_as_main_bell: { _eq: true } }
        ) {
          ...mainBellFragment
        }
      }
      ${mainBellFragment}
    `,
  })
  if (errors) return undefined
  return data.m2_bells
}

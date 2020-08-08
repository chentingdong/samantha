import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { m2SecondaryBellFragment } from "../fragments/secondaryBells"

export const getSecondaryBells = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query secondary_bells {
        m2_bells(
          order_by: { created_at: asc }
          where: { acts_as_main_bell: { _eq: true } }
        ) {
          ...m2SecondaryBellFragment
        }
      }
      ${m2SecondaryBellFragment}
    `,
  })
  if (errors) return undefined
  return data.m2_bells
}

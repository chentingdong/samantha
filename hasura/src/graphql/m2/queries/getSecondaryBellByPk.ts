import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { secondaryBellFragment } from "../fragments/secondaryBells"

export const getSecondaryBellByPk = async (id: String) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query secondaryBells_by_pk($id: String!) {
        m2_bells_by_pk(id: $id) {
          ...secondaryBellFragment
        }
      }
      ${secondaryBellFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.m2_bells_by_pk
}

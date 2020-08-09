import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { m2MainBellFragment } from "../fragments/mainBells"

export const getMainBellByPk = async (id: String) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query mainBells_by_pk($id: String!) {
        m2_bells_by_pk(id: $id) {
          ...m2MainBellFragment
        }
      }
      ${m2MainBellFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.m2_bells_by_pk
}

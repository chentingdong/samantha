import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { m2BellhopFragment } from "../fragments/bellhops"

export const getBellhopByPk = async (id: String) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query bellhops_by_pk($id: String!) {
        m2_bellhops_by_pk(id: $id) {
          ...m2BellhopFragment
        }
      }
      ${m2BellhopFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.m2_bellhops_by_pk
}

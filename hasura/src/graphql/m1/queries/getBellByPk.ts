import apolloClient from "../../apolloClient"
import { gql, FetchPolicy } from "@apollo/client"
import { bellFragment } from "../fragments/bells"

export const getBellByPk = async (
  id: string,
  fetchPolicy: FetchPolicy = "cache-first"
) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query bells_by_pk($id: String!) {
        bells_by_pk(id: $id) {
          ...bellFragment
        }
      }
      ${bellFragment}
    `,
    variables: { id },
    fetchPolicy,
  })
  if (errors) return undefined
  return data.bells_by_pk
}

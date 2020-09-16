import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const getIntegrationAuthentication = async (
  bell_id: String,
  app_secret: String
) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query api_integration_authentication(
        $bell_id: String
        $app_secret: String
      ) {
        m2_api_integration(
          where: { app_id: { _eq: $bell_id }, app_secret: { _eq: $app_secret } }
        ) {
          app_id
          app_secret
        }
      }
    `,
    variables: { bell_id, app_secret },
  })

  if (errors || data === undefined || data.m2_api_integration.length !== 1)
    return false

  const authentication = {
    bell_id: data.m2_api_integration[0].app_id,
    app_secret: data.m2_api_integration[0].app_secret,
  }
  return authentication
}

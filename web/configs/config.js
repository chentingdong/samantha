import { ErrorPolicy } from "@apollo/client"
const uiBaseUrl = window.location.origin
const apiPort = "8080"
const graphQLPath = "/v1alpha1/graphql"
const graphQLUri =
  process.env.NODE_ENV === "production"
    ? `${window.location.protocol}//${window.location.hostname}:${apiPort}${graphQLPath}`
    :  `http://localhost:${apiPort}${graphQLPath}`

const webSocketUri =
  process.env.NODE_ENV === "production" &&
    window.location.hostname !== "localhost"
    ? `wss://${window.location.hostname}:${apiPort}${graphQLPath}`
    :  `ws://localhost:${apiPort}${graphQLPath}`

const config = {
  Auth: {
    region: "us-east-1",
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
    identityPoolId: process.env.IDENTITY_POOL_ID,
    authenticationFlowType: "USER_PASSWORD_AUTH",
    oauth: {
      domain: "samantha-os.auth.us-east-1.amazoncognito.com",
      scope: ["email", "profile", "openid"],
      redirectSignIn: uiBaseUrl,
      redirectSignOut: uiBaseUrl + "/logout",
      // 'code' or 'token'. REFRESH token will only be generated when the responseType is code
      responseType: "code",
    },
  },
  Storage: {
    region: "us-east-1",
    bucket: "samantha-files",
    level: "public",
    identityPoolId: process.env.IDENTITY_POOL_ID,
    cloudFrontBaseUrl: process.env.CLOUD_FRONT_BASE_URL,
  },
  social: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    facebookAppId: process.env.FACEBOOK_APP_ID,
  },
  uiBaseUrl: uiBaseUrl,
  suggestUrl: process.env.SUGGEST_URL,
  graphQL: {
    HttpLink: {
      uri: graphQLUri,
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      },
    },
    WebSocketLink: {
      uri: webSocketUri,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
          },
        },
      },
    },
  },
  keyboard: {
    magic: false,
  },
}

export default config

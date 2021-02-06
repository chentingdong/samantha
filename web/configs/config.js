import { ErrorPolicy } from "@apollo/client"
const uiBaseUrl = window.location.origin
const apiPort = "8080"
const graphQLPath = "/v1alpha1/graphql"
const graphQLUri =
  process.env.NODE_ENV === "production"
    ? `${window.location.protocol}//${window.location.hostname}:${apiPort}${graphQLPath}`
    : // : `https://poc.dev.bellhop.io:${apiPort}${graphQLPath}`
    `http://localhost:${apiPort}${graphQLPath}`

const webSocketUri =
  process.env.NODE_ENV === "production" &&
    window.location.hostname !== "localhost"
    ? `wss://${window.location.hostname}:${apiPort}${graphQLPath}`
    : // : `wss://poc.dev.bellhop.io:${apiPort}${graphQLPath}`
    `ws://localhost:${apiPort}${graphQLPath}`

const config = {
  Auth: {
    identityPoolId: "us-east-1:e796da41-e1d7-4e63-8fd5-f3a6cc1cd3fc ",
    region: "us-east-1",
    userPoolId: "us-east-1_jGxsHXNhm",
    userPoolWebClientId: "6vci3a7vthumquku5483t6ujsq",
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
    identityPoolId: "us-east-1:e796da41-e1d7-4e63-8fd5-f3a6cc1cd3fc",
    // cloudFrontBaseUrl: "http://d1jj88e5zcz4n8.cloudfront.net",
  },
  social: {
    googleClientId:
      "258730687255-jn081g0coq4pm4s0ebu0ljghk5tunfor.apps.googleusercontent.com",
  },
  uiBaseUrl: uiBaseUrl,
  suggestUrl:
    "https://xwkk9zmwbj.execute-api.us-east-1.amazonaws.com/dev/suggest",
  graphQL: {
    HttpLink: {
      uri: graphQLUri,
      headers: {
        "x-hasura-admin-secret": "qcA.wmEfFzDpfzZZoepJs7gw",
      },
    },
    WebSocketLink: {
      uri: webSocketUri,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            "x-hasura-admin-secret": "qcA.wmEfFzDpfzZZoepJs7gw",
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

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
    identityPoolId: "us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc",
    region: "us-east-1",
    userPoolId: "us-east-1_6akVugwW4",
    userPoolWebClientId: "6d1p0lme6utp45besu853baov6",
    authenticationFlowType: "USER_PASSWORD_AUTH",
    oauth: {
      domain: "samantha.auth.us-east-1.amazoncognito.com",
      scope: ["email", "profile", "openid"],
      redirectSignIn: uiBaseUrl,
      redirectSignOut: uiBaseUrl + "/logout",
      // 'code' or 'token'. REFRESH token will only be generated when the responseType is code
      responseType: "code",
    },
  },
  Storage: {
    region: "global",
    bucket: "samantha-upload",
    identityPoolId: "us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc",
  },
  social: {
    googleClientId:
      "207735501972-ocdbkaprm6s2mvsb7h91ecfq7r4fvmne.apps.googleusercontent.com",
    facebookAppId: "2505833796351691",
  },
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

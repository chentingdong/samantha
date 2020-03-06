const config = {
  Auth: {
    identityPoolId: 'us-east-2:5372a990-3a22-457f-ac62-31a7be7fda9d',
    region: 'us-east-2',
    userPoolId: 'us-east-2_qYgDsExIj',
    userPoolWebClientId: '7fph2io9lg9g2vbntf9n440l60',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'samantha.auth.us-east-1.amazoncognito.com',
      scope: [ 'phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin' ],
      redirectSignIn: 'https://localhost:3000/',
      redirectSignOut: 'https://localhost:3000/',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  },
  Storage: {
    region: 'global',
    bucket: 'samantha-upload',
    identityPoolId: 'config.cognito.IDENTITY_POOL_ID'
  },
  social: {
    google_client_id: "174411671261-g6u4v14c5caiag2db22kp42980bejik4.apps.googleusercontent.com",
    facebook_app_id: "2505833796351691"
  },
  wsUrl: 'wss://n8jhaqype5.execute-api.us-east-1.amazonaws.com/dev',
  suggestUrl: 'https://xwkk9zmwbj.execute-api.us-east-1.amazonaws.com/dev/suggest',
  apiBaseUrl: 'https://xo8vusiqoa.execute-api.us-east-1.amazonaws.com/dev'
}

export default config;
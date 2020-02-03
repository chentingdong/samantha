const config = {
  Auth: {
    identityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
    region: 'us-east-1',
    userPoolId: 'us-east-1_6akVugwW4',
    userPoolWebClientId: '33n2s6msn2sa7tjm5mdij9ti8f',
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
  wsUrl: 'wss://jhempytc66.execute-api.us-east-1.amazonaws.com/test',
  suggestUrl: 'https://xwkk9zmwbj.execute-api.us-east-1.amazonaws.com/dev/suggest'
}

export default config;
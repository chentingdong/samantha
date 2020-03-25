const config = {
  Auth: {
    identityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
    region: 'us-east-1',
    userPoolId: 'us-east-1_6akVugwW4',
    userPoolWebClientId: '7fph2io9lg9g2vbntf9n440l60',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'samantha.auth.us-east-1.amazoncognito.com',
      scope: [ 'phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin' ],
      redirectSignIn: 'https://localhost:2000/',
      redirectSignOut: 'https://localhost:2000/',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  },
  Storage: {
    region: 'global',
    bucket: 'samantha-upload',
    identityPoolId: 'config.cognito.IDENTITY_POOL_ID'
  },
  social: {
    google_client_id: "207735501972-ocdbkaprm6s2mvsb7h91ecfq7r4fvmne.apps.googleusercontent.com",
    facebook_app_id: "2505833796351691"
  },
  wsUrl: 'wss://localhost:3001',
  suggestUrl: 'https://xwkk9zmwbj.execute-api.us-east-1.amazonaws.com/dev/suggest',
  apiBaseUrl: 'https://localhost:3000'
};

export default config;
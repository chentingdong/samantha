const config = {
  Auth: {
    identityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
    region: 'us-east-1',
    userPoolId: 'us-east-1_6akVugwW4',
    userPoolWebClientId: '6d1p0lme6utp45besu853baov6',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'samantha.auth.us-east-1.amazoncognito.com',
      scope: [ 'email', 'profile', 'openid' ],
      redirectSignIn: 'https://localhost:2000',
      redirectSignOut: 'https://localhost:2000/user/login',
      // 'code' or 'token'. REFRESH token will only be generated when the responseType is code
      responseType: 'token'
    }
  },
  Storage: {
    region: 'global',
    bucket: 'samantha-upload',
    identityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc'
  },
  social: {
    googleClientId: "207735501972-ocdbkaprm6s2mvsb7h91ecfq7r4fvmne.apps.googleusercontent.com",
    facebookAppId: "2505833796351691"
  },
  wsUrl: 'wss://localhost:3001',
  suggestUrl: 'https://xwkk9zmwbj.execute-api.us-east-1.amazonaws.com/dev/suggest',
  apiBaseUrl: 'https://localhost:3000'
};

export default config;
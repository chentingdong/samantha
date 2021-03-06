const uiBaseUrl = window.location.origin
const portWeb = uiBaseUrl.includes('local') ? ':3000' : ''
const apiBaseUrl =
  window.location.protocol + '//' + window.location.hostname + portWeb
const portWs = uiBaseUrl.includes('local') ? ':3001' : ''
const wsUrl = 'wss://' + window.location.hostname + portWs

const config = {
  Auth: {
    identityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
    region: 'us-east-1',
    userPoolId: 'us-east-1_6akVugwW4',
    userPoolWebClientId: '6d1p0lme6utp45besu853baov6',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'samantha.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: uiBaseUrl,
      redirectSignOut: uiBaseUrl + '/login',
      // 'code' or 'token'. REFRESH token will only be generated when the responseType is code
      responseType: 'token',
    },
  },
  Storage: {
    region: 'global',
    bucket: 'samantha-upload',
    identityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
  },
  social: {
    googleClientId:
      '207735501972-ocdbkaprm6s2mvsb7h91ecfq7r4fvmne.apps.googleusercontent.com',
    facebookAppId: '2505833796351691',
  },
  wsUrl: wsUrl,
  suggestUrl:
    'https://xwkk9zmwbj.execute-api.us-east-1.amazonaws.com/dev/suggest',
  apiBaseUrl: apiBaseUrl,
}

export default config

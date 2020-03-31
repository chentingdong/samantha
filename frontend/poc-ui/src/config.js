const uiBaseUrl = window.location.origin;
const apiBaseUrl = window.location.protocol + '//' + window.location.hostname + ':3000';
const wsUrl = 'wss://' + window.location.hostname + ':3001';

const config = {
  Auth: {
    identityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
    region: 'us-east-1',
    userPoolId: 'us-east-1_6akVugwW4',
    userPoolWebClientId: '7fph2io9lg9g2vbntf9n440l60',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'samantha.auth.us-east-1.amazoncognito.com',
      scope: [ 'email', 'profile', 'openid' ],
      redirectSignIn: uiBaseUrl,
      redirectSignOut: uiBaseUrl + '/user/login',
      // 'code' or 'token'. REFRESH token will only be generated when the responseType is code
      responseType: 'token'
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
  wsUrl: wsUrl,
  suggestUrl: 'https://xwkk9zmwbj.execute-api.us-east-1.amazonaws.com/dev/suggest',
  apiBaseUrl: apiBaseUrl
};

export default config;
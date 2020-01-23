const config = {
  Auth: {
    identityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
    region: 'us-east-1',
    userPoolId: 'us-east-1_6akVugwW4',
    userPoolWebClientId: '33n2s6msn2sa7tjm5mdij9ti8f'
  },
  Storage: {
    region: 'global',
    bucket: 'samantha-upload',
    identityPoolId: 'config.cognito.IDENTITY_POOL_ID'
  },
  social: {
    FB: "2505833796351691",
    Google: "174411671261-h1hg0n1sob7fhsblnfsgf11ku8ert89h.apps.googleusercontent.com"
  }
}

export default config;
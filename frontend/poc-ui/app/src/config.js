//amplify configuration
export default {
  s3: {
    REGION: "us-east-2",
    BUCKET: "samantha-uploads"
  },
  apiGateway: {
    REGION: "YOUR_API_GATEWAY_REGION",
    URL: "YOUR_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_qYgDsExIj",
    APP_CLIENT_ID: "7fph2io9lg9g2vbntf9n440l60",
    IDENTITY_POOL_ID: "samantha"
  }
};
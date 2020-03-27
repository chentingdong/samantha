'use strict';
const aws = require( 'aws-sdk' );
const CONSTANTS = require( '../constants' );
const config = require( '../config' );

const listIdentityPoolUsers = async () => {
  let cognitoidentity = new aws.CognitoIdentity();
  let params = {
    IdentityPoolId: config.cognito.identityPoolId,
    MaxResults: 50
  };
  let data = await cognitoidentity.listIdentities( params ).promise();

  console.log( data );
  return {
    statusCode: 200,
    headers: CONSTANTS.RESPONSE_HEADERS,
    body: JSON.stringify( data.Identities )
  };
};

const listUserPoolUsers = async () => {
  let params = {
    UserPoolId: config.cognito.userPoolId,
    AttributesToGet: [
      'name',
      'email',
      'picture',
      'sub',
      'given_name'
    ]
  };
  let cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();
  let data = await cognitoIdentityServiceProvider.listUsers( params ).promise();

  console.log( data.Users );
  return {
    statusCode: 200,
    headers: CONSTANTS.RESPONSE_HEADERS,
    body: JSON.stringify( data.Users )
  };
};

module.exports = {
  listIdentityPoolUsers,
  listUserPoolUsers
};

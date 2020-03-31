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

  const users = data.Users.map( u => {
    let attributes = {};
    u.Attributes.forEach( attr => {
      attributes[ attr.Name ] = attr.Value;
    } );
    let user = {
      username: u.Username,
      attributes: attributes
    };
    return user;
  } );
  console.log( `got users: ${ JSON.stringify( users, null, 2 ) }` );
  return {
    statusCode: 200,
    headers: CONSTANTS.RESPONSE_HEADERS,
    body: JSON.stringify( users )
  };
};

const getUserPoolUser = async ( event, context ) => {
  let username = event.pathParameters.username;
  let params = {
    UserPoolId: config.cognito.userPoolId,
    Username: username
  };
  let cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();
  try {
    let user = await cognitoIdentityServiceProvider.adminGetUser( params ).promise();

    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: JSON.stringify( user )
    };
  }
  catch ( err ) {
    return {
      statusCode: 200,
      headers: CONSTANTS.RESPONSE_HEADERS,
      body: null
    };
  }
};

module.exports = {
  listIdentityPoolUsers,
  listUserPoolUsers,
  getUserPoolUser
};

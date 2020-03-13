'use strict';

const aws = require( 'aws-sdk' );

const listIdentityPoolUsers = () => {

  let cognitoidentity = new aws.CognitoIdentity();
  let params = {
    IdentityPoolId: 'us-east-1:e521146f-c326-4330-bd16-600e0ddf24dc',
    MaxResults: 50
  };
  cognitoidentity.listIdentities( params, ( err, data ) => {
    if ( err ) console.log( err, err.stack );
    else {
      console.log( data );
      let users = data.Identities;
      return users;
    }
  } );
};

module.exports = { listIdentityPoolUsers };

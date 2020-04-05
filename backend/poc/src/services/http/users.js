"use strict";
const aws = require("aws-sdk");
const config = require("../../config");

module.exports.listIdentityPoolUsers = async () => {
  const cognitoidentity = new aws.CognitoIdentity();
  const params = {
    IdentityPoolId: config.cognito.identityPoolId,
    MaxResults: 50,
  };
  const data = await cognitoidentity.listIdentities(params).promise();
  console.log(data);
  return data.Identities;
};

module.exports.listUserPoolUsers = async () => {
  const params = {
    UserPoolId: config.cognito.userPoolId,
    AttributesToGet: ["name", "email", "picture", "sub", "given_name"],
  };
  const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();
  const data = await cognitoIdentityServiceProvider.listUsers(params).promise();
  const users = data.Users.map((u) => {
    let attributes = {};
    u.Attributes.forEach((attr) => {
      attributes[attr.Name] = attr.Value;
    });
    let user = {
      username: u.Username,
      attributes: attributes,
    };
    return user;
  });
  console.log(`got users: ${JSON.stringify(users, null, 2)}`);
  return users;
};

module.exports.getUserPoolUser = async (event, context) => {
  const { username } = event.path;
  const params = {
    UserPoolId: config.cognito.userPoolId,
    Username: username,
  };
  const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();
  const user = await cognitoIdentityServiceProvider
    .adminGetUser(params)
    .promise();
  return user;
};

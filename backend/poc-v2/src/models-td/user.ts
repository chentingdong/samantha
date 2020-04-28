import {Context} from './context'
import config from "../../config/cognito.json";
import aws from "aws-sdk";
import uuid from 'uuid';

export class User {
  readonly id: string = uuid.v4();
  attributes: object = {};

  constructor() { }

  static login = () => {
    const context = Context.getInstance()
    context.set('isAuthenticated', true);
  }

  static getUserPoolUser = async (username: string) => {
    const params = {
      UserPoolId: config.userPoolId,
      Username: username,
    };
    const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();
    const userInfo = await cognitoIdentityServiceProvider
      .adminGetUser(params)
      .promise();

    let attributes = {};
    userInfo.UserAttributes?.forEach((attr: object) => {
      attributes[attr.Name] = attr.Value;
    });

    let user = new User();
    user.attributes = attributes;

    const context = Context.getInstance()
    context.set('user', user)

    return user;
  }

  static listUserPoolUsers = async () => {
    const params = {
      UserPoolId: config.userPoolId,
      AttributesToGet: ["name", "email", "picture", "sub", "given_name"],
    };
    const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider();
    const data = await cognitoIdentityServiceProvider.listUsers(params).promise();
    const users = data.Users?.map((u: object) => {
      let attributes = {};
      u.Attributes.forEach((attr: object) => {
        attributes[attr.Name] = attr.Value;
      });
      let user = {
        username: u.Username,
        attributes: attributes,
      };
      return user;
    });

    const context = Context.getInstance()
    context.set('users', users)
    return users;
  }
}

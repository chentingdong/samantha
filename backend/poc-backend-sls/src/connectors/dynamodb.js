'use strict';

const aws = require('aws-sdk');
const CONSTANTS = require('../constants');

class DynamoDbConnector {
  constructor() {
    this._connector = new aws.DynamoDB.DocumentClient(CONSTANTS.DYNAMODB_OPTIONS);
  }

  get connector() {
    return this._connector;
  }

  async registerSocket(connectionId, userId) {
    const socketParams = {
      TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
      Item: {
        connectionId,
        userId
      }
    };

    return await this._connector.put(socketParams).promise();
  }

  async removeSocket(connectionId) {
    const socketParams = {
      TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
      Key: {
        connectionId
      }
    };

    return await this._connector.delete(socketParams).promise();
  }

  async findSocketsByUser(userId) {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
      IndexName: CONSTANTS.DYNAMODB_SOCKETS_USER_GSI,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };

    return await this._connector.query(queryParams).promise();
  }

  async addTask(taskId, userId, data) {
    const socketParams = {
      TableName: CONSTANTS.DYNAMODB_TASKS_TABLE,
      Item: {
        taskId,
        userId,
        data
      }
    };
    return await this._connector.put(socketParams).promise();
  }

  async findTask(taskId) {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_TASKS_TABLE,
      KeyConditionExpression: 'taskId = :taskId',
      ExpressionAttributeValues: {
        ':taskId': taskId
      }
    };
    return await this._connector.query(queryParams).promise();
  }
}

const DYNAMODB_CONNECTOR = new DynamoDbConnector();
module.exports = DYNAMODB_CONNECTOR;

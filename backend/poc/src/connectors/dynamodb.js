'use strict';

const aws = require( 'aws-sdk' );
const CONSTANTS = require('../constants');
const dynamodb = require('serverless-dynamodb-client');

// TODO: divide into multiple models
class DynamoDbConnector {
  constructor() {
    this._connector = dynamodb.doc;
  }

  get connector() {
    return this._connector;
  }

  async createSocket(connectionId, userId) {
    const socketParams = {
      TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
      Item: {
        connectionId,
        userId
      }
    };

    return await this._connector.put(socketParams).promise();
  }

  async deleteSocket(connectionId) {
    const socketParams = {
      TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
      Key: {
        connectionId
      }
    };

    return await this._connector.delete(socketParams).promise();
  }

  async listSocketsByUser(userId) {
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

  async createCaseDefinition(id, data) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASE_DEFINITIONS_TABLE,
      Item: {
        id,
        data
      }
    };
    return await this._connector.put(params).promise();
  }

  async getCaseDefinition(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASE_DEFINITIONS_TABLE,
      Item: {
        id
      }
    };
    return await this._connector.get(params).promise();
  }

  async getCaseMessages ( caseId ) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASE_MESSAGES_TABLE,
      IndexName: CONSTANTS.DYNAMODB_CASE_MESSAGES_CASEID_GSI,
      ExpressionAttributeValues: {
        ':caseId': caseId
      },
      Key: {id, caseId, state, data }
    }

    return await this._connector.get( params ).promise();
  }

  async listCaseDefinitions() {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_CASE_DEFINITIONS_TABLE
    };
    return await this._connector.scan(queryParams).promise();
  }

  async deleteCaseDefinition(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASE_DEFINITIONS_TABLE,
      Key: {
        id
      }
    };
    return await this._connector.delete(params).promise();
  }

  async createTaskDefinition(id, data) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TASK_DEFINITIONS_TABLE,
      Item: {
        id,
        data
      }
    };
    return await this._connector.put(params).promise();
  }

  async getTaskDefinition(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TASK_DEFINITIONS_TABLE,
      Item: {
        id
      }
    };
    return await this._connector.get(params).promise();
  }

  async listTaskDefinitions() {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_TASK_DEFINITIONS_TABLE
    };
    return await this._connector.scan(queryParams).promise();
  }

  async deleteTaskDefinition(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TASK_DEFINITION_TABLE,
      Key: {
        id
      }
    };
    return await this._connector.delete(params).promise();
  }

  async createCase(id, state, data) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASES_TABLE,
      Item: {
        id,
        state,
        data
      }
    };
    return await this._connector.put(params).promise();
  }

  async getCase(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASES_TABLE,
      Key: {
        id
      }
    };
    return await this._connector.get(params).promise();
  }

  async listCases() {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_CASES_TABLE
    };
    return await this._connector.scan(queryParams).promise();
  }

  async updateCaseState(id, state) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASES_TABLE,
      Key: { id },
      UpdateExpression: 'set #state = :state',
      ExpressionAttributeNames: {'#state' : 'state'},
      ExpressionAttributeValues: {':state': state}
    };
    return await this._connector.update(params).promise();
  }

  async updateCaseData(id, data) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASES_TABLE,
      Key: { id },
      UpdateExpression: 'set #data = :data',
      ExpressionAttributeNames: {'#data' : 'data'},
      ExpressionAttributeValues: {':data': data}
    };
    return await this._connector.update(params).promise();
  }

  async deleteCase(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASES_TABLE,
      Key: {
        id
      }
    };
    return await this._connector.delete(params).promise();
  }

  async createTaskInCase(id, caseId, state, data) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TASKS_TABLE,
      Item: {
        id,
        caseId,
        state,
        data
      }
    };
    return await this._connector.put(params).promise();
  }

  async getTask(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TASKS_TABLE,
      Item: {
        id
      }
    };
    return await this._connector.get(params).promise();
  }

  async listTasks() {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_TASKS_TABLE
    };
    return await this._connector.scan(queryParams).promise();
  }

  async listTasksByCase(caseId) {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_TASKS_TABLE,
      IndexName: CONSTANTS.DYNAMODB_TASKS_ON_CASE_GSI,
      KeyConditionExpression: 'caseId = :caseId',
      ExpressionAttributeValues: {
        ':caseId': caseId
      }
    };
    return await this._connector.query(queryParams).promise();
  }

  async updateTaskState(id, state) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TASKS_TABLE,
      Key: { id },
      UpdateExpression: 'set #state = :state',
      ExpressionAttributeNames: {'#state' : 'state'},
      ExpressionAttributeValues: {':state': state}
    };
    return await this._connector.update(params).promise();
  }

  async deleteTask(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TASKS_TABLE,
      Key: {
        id
      }
    };
    return await this._connector.delete(params).promise();
  }

  async createCaseMessage ( id, caseId, data ) {
    const createdAt = data.createdAt || Date.now()
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASE_MESSAGES_TABLE,
      Item: {
        id,
        caseId,
        createdAt,
        data
      }
    };
    return await this._connector.put(params).promise();
  }

  async listCaseMessages() {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_CASE_MESSAGES_TABLE
    };
    return await this._connector.scan(queryParams).promise();
  }

  async listCaseMessagesByCase(caseId) {
    const queryParams = {
      TableName: CONSTANTS.DYNAMODB_CASE_MESSAGES_TABLE,
      IndexName: CONSTANTS.DYNAMODB_CASE_MESSAGES_CASEID_GSI,
      KeyConditionExpression: 'caseId = :caseId',
      ExpressionAttributeValues: {
        ':caseId': caseId
      }
    };
    return await this._connector.query(queryParams).promise();
  }

  async deleteCaseMessage(id) {
    const params = {
      TableName: CONSTANTS.DYNAMODB_CASE_MESSAGES_TABLE,
      Key: {
        id
      }
    };
    return await this._connector.delete(params).promise();
  }

}


const DYNAMODB_CONNECTOR = new DynamoDbConnector();
module.exports = DYNAMODB_CONNECTOR;

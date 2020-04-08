"use strict";

const dynamodb = require("serverless-dynamodb-client");

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
      TableName: process.env.DYNAMODB_SOCKETS_TABLE,
      Item: {
        connectionId,
        userId,
      },
    };

    return await this._connector.put(socketParams).promise();
  }

  async deleteSocket(connectionId) {
    const socketParams = {
      TableName: process.env.DYNAMODB_SOCKETS_TABLE,
      Key: {
        connectionId,
      },
    };

    return await this._connector.delete(socketParams).promise();
  }

  async listSockets() {
    const queryParams = {
      TableName: process.env.DYNAMODB_SOCKETS_TABLE,
    };
    return await this._connector.scan(queryParams).promise();
  }

  async listSocketsByUser(userId) {
    const queryParams = {
      TableName: process.env.DYNAMODB_SOCKETS_TABLE,
      IndexName: process.env.DYNAMODB_SOCKETS_USER_GSI,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    try {
      return await this._connector.query(queryParams).promise();
    } catch (err) {
      console.error(`wierd error: ${err}`);
      return [];
    }
  }

  async createCaseDefinition(id, data) {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASE_DEFINITIONS_TABLE,
      Item: {
        id,
        data,
      },
    };
    try {
      let resp = await this._connector.put(queryParams).promise();
    } catch (err) {
      console.error(err);
    }
    return resp;
  }

  async getCaseDefinition(id) {
    const params = {
      TableName: process.env.DYNAMODB_CASE_DEFINITIONS_TABLE,
      Key: {
        id,
      },
    };
    return await this._connector.get(params).promise();
  }

  async getCaseMessages(caseId) {
    const params = {
      TableName: process.env.DYNAMODB_CASE_MESSAGES_TABLE,
      IndexName: process.env.DYNAMODB_CASE_MESSAGES_CASEID_GSI,
      ExpressionAttributeValues: {
        ":caseId": caseId,
      },
      Key: { id, caseId, state, data },
    };

    return await this._connector.get(params).promise();
  }

  async listCaseDefinitions() {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASE_DEFINITIONS_TABLE,
    };
    return await this._connector.scan(queryParams).promise();
  }

  async deleteCaseDefinition(id) {
    const params = {
      TableName: process.env.DYNAMODB_CASE_DEFINITIONS_TABLE,
      Key: {
        id,
      },
    };
    return await this._connector.delete(params).promise();
  }

  async createTaskDefinition(id, data) {
    const params = {
      TableName: process.env.DYNAMODB_TASK_DEFINITIONS_TABLE,
      Item: {
        id,
        data,
      },
    };
    return await this._connector.put(params).promise();
  }

  async getTaskDefinition(id) {
    const params = {
      TableName: process.env.DYNAMODB_TASK_DEFINITIONS_TABLE,
      Key: {
        id,
      },
    };
    return await this._connector.get(params).promise();
  }

  async listTaskDefinitions() {
    const queryParams = {
      TableName: process.env.DYNAMODB_TASK_DEFINITIONS_TABLE,
    };

    return await this._connector.scan(queryParams).promise();
  }

  async deleteTaskDefinition(id) {
    const params = {
      TableName: process.env.DYNAMODB_TASK_DEFINITION_TABLE,
      Key: {
        id,
      },
    };
    return await this._connector.delete(params).promise();
  }

  async createCase(caseItem) {
    const params = {
      TableName: process.env.DYNAMODB_CASES_TABLE,
      Item: caseItem,
    };
    return await this._connector.put(params).promise();
  }

  async getCase(id) {
    const params = {
      TableName: process.env.DYNAMODB_CASES_TABLE,
      Key: {
        id,
      },
    };
    return await this._connector.get(params).promise();
  }

  async listCases() {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASES_TABLE,
    };
    return await this._connector.scan(queryParams).promise();
  }

  async updateCaseState(id, state) {
    const params = {
      TableName: process.env.DYNAMODB_CASES_TABLE,
      Key: { id },
      UpdateExpression: "set #state = :state",
      ExpressionAttributeNames: { "#state": "state" },
      ExpressionAttributeValues: { ":state": state },
    };
    return await this._connector.update(params).promise();
  }

  async updateCaseData(id, data) {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASES_TABLE,
      Key: { id },
      UpdateExpression: "set #data = :data",
      ExpressionAttributeNames: { "#data": "data" },
      ExpressionAttributeValues: { ":data": data },
    };
    return await this._connector.update(queryParams).promise();
  }

  async deleteCase(id) {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASES_TABLE,
      Key: {
        id,
      },
    };
    return await this._connector.delete(queryParams).promise();
  }

  async createTaskInCase(caseItem) {
    const queryParams = {
      TableName: process.env.DYNAMODB_TASKS_TABLE,
      Item: caseItem,
    };
    return await this._connector.put(queryParams).promise();
  }

  async getTask(id) {
    const queryParams = {
      TableName: process.env.DYNAMODB_TASKS_TABLE,
      Key: {
        id,
      },
    };
    return await this._connector.get(queryParams).promise();
  }

  async listTasks() {
    const queryParams = {
      TableName: process.env.DYNAMODB_TASKS_TABLE,
    };
    return await this._connector.scan(queryParams).promise();
  }

  async listTasksByCase(caseId) {
    const queryParams = {
      TableName: process.env.DYNAMODB_TASKS_TABLE,
      IndexName: process.env.DYNAMODB_TASKS_ON_CASE_GSI,
      KeyConditionExpression: "caseId = :caseId",
      ExpressionAttributeValues: {
        ":caseId": caseId,
      },
    };
    return await this._connector.query(queryParams).promise();
  }

  async updateTaskState(id, state) {
    const queryParams = {
      TableName: process.env.DYNAMODB_TASKS_TABLE,
      Key: { id },
      UpdateExpression: "set #state = :state",
      ExpressionAttributeNames: { "#state": "state" },
      ExpressionAttributeValues: { ":state": state },
    };
    return await this._connector.update(queryParams).promise();
  }

  async deleteTask(id) {
    const queryParams = {
      TableName: process.env.DYNAMODB_TASKS_TABLE,
      Key: { id },
    };
    return await this._connector.delete(queryParams).promise();
  }

  async createCaseMessage(message) {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASE_MESSAGES_TABLE,
      Item: message,
    };
    return await this._connector.put(queryParams).promise();
  }

  async listCaseMessages() {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASE_MESSAGES_TABLE,
    };
    return await this._connector.scan(queryParams).promise();
  }

  async listCaseMessagesByCase(caseId) {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASE_MESSAGES_TABLE,
      IndexName: process.env.DYNAMODB_CASE_MESSAGES_CASEID_GSI,
      KeyConditionExpression: "caseId = :caseId",
      ExpressionAttributeValues: {
        ":caseId": caseId,
      },
    };
    return await this._connector.query(queryParams).promise();
  }

  async deleteCaseMessage(id) {
    const queryParams = {
      TableName: process.env.DYNAMODB_CASE_MESSAGES_TABLE,
      Key: { id },
    };
    return await this._connector.delete(queryParams).promise();
  }
}

const DYNAMODB_CONNECTOR = new DynamoDbConnector();
module.exports = DYNAMODB_CONNECTOR;

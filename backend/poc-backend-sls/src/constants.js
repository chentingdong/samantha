'use strict';

const CONSTANTS = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  COGNITO_USER_POOL: process.env.COGNITO_USER_POOL,
  COGNITO_USER_POOL_CLIENT: process.env.COGNITO_USER_POOL_CLIENT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  BUCKET_NAME: process.env.BUCKET_NAME,
  DYNAMODB_SOCKETS_TABLE: process.env.DYNAMODB_SOCKETS_TABLE,
  DYNAMODB_SOCKETS_USER_GSI: process.env.DYNAMODB_SOCKETS_USER_GSI,
  DYNAMODB_CASE_DEFINITIONS_TABLE: process.env.DYNAMODB_CASE_DEFINITIONS_TABLE,
  DYNAMODB_TASK_DEFINITIONS_TABLE: process.env.DYNAMODB_TASK_DEFINITIONS_TABLE,
  DYNAMODB_CASES_TABLE: process.env.DYNAMODB_CASES_TABLE,
  DYNAMODB_TASKS_TABLE: process.env.DYNAMODB_TASKS_TABLE,
  DYNAMODB_TASKS_ON_CASE_GSI: process.env.DYNAMODB_TASKS_ON_CASE_GSI,
  DYNAMODB_CASE_MESSAGES_TABLE: process.env.DYNAMODB_CASE_MESSAGES_TABLE,
  DYNAMODB_CASE_MESSAGES_ON_CASE_GSI: process.env.DYNAMODB_CASE_MESSAGES_ON_CASE_GSI,
  DYNAMODB_OPTIONS: {},
  KEYS_URL: process.env.KEYS_URL,
  SIGNED_URL_EXPIRE_SECONDS: 60 * 60,
  WEBSOCKET_API_ENDPOINT: process.env.WEBSOCKET_API_ENDPOINT,
  RESPONSE_HEADERS: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  }
};

module.exports = CONSTANTS;

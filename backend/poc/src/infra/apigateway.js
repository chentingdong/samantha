"use strict";
const aws = require("aws-sdk");
const dynamodbConnector = require("./dynamodb");
const { isOffline } = require("../utils");

function readCA() {
  const caPath = require.resolve("../../certs/rootCA.pem");
  return require("fs").readFileSync(caPath);
}

module.exports.readCA = readCA;

class ApiGatewayConnector {
  constructor() {
    let CONNECTOR_OPTS = {};
    if (isOffline()) {
      const agent = new require("https").Agent({ ca: readCA() });
      CONNECTOR_OPTS = {
        region: "localhost",
        endpoint: "https://localhost:3001/",
        sslEnabled: true,
        httpOptions: { agent },
      };
    } else {
      CONNECTOR_OPTS = {
        endpoint: process.env.WEBSOCKET_API_ENDPOINT,
        sslEnabled: true,
      };
    }

    this._connector = new aws.ApiGatewayManagementApi(CONNECTOR_OPTS);
  }

  get connector() {
    return this._connector;
  }

  async generateSocketMessage(connectionId, data) {
    try {
      return await this._connector
        .postToConnection({
          ConnectionId: connectionId,
          Data: data,
        })
        .promise();
    } catch (error) {
      console.error("Unable to generate socket message", error);
      if (error.statusCode === 410) {
        console.log(`Removing stale connector ${connectionId}`);
        await dynamodbConnector.deleteSocket(connectionId);
      }
    }
  }
}

const APIGW_CONNECTOR = new ApiGatewayConnector();
module.exports.apigatewayConnector = APIGW_CONNECTOR;

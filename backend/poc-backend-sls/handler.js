'use strict';

// const {
//     authUser,
//     authWebsocket,
//     refreshToken
// } = require('./src/services/auth');

const {
  interaction
} = require('./src/services/interaction');

const {
  webhook
} = require('./src/services/webhook');

const {
  defaultSocketHandler,
  handleSocketConnect,
  handleSocketDisconnect
} = require('./src/services/websocket');

// module.exports.authUser = authUser;
// module.exports.authWebsocket = authWebsocket;
// module.exports.refreshToken = refreshToken;

module.exports.handleSocketConnect = handleSocketConnect;
module.exports.handleSocketDisconnect = handleSocketDisconnect;
module.exports.defaultSocketHandler = defaultSocketHandler;
module.exports.interaction = interaction;
module.exports.webhook = webhook;

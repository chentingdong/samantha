'use strict';

// const {
//     authUser,
//     authWebsocket,
//     refreshToken
// } = require('./src/services/auth');

const {
    handleSocketInteraction
} = require('./src/services/interaction');

const {
  webhook
} = require('./src/services/webhook');

const {
    handleSocketDefault,
  handleSocketConnect,
  handleSocketDisconnect
} = require('./src/services/websocket');

// module.exports.authUser = authUser;
// module.exports.authWebsocket = authWebsocket;
// module.exports.refreshToken = refreshToken;

module.exports.handleSocketConnect = handleSocketConnect;
module.exports.handleSocketDisconnect = handleSocketDisconnect;
module.exports.handleSocketDefault = handleSocketDefault;
module.exports.handleSocketInteraction = handleSocketInteraction;
module.exports.webhook = webhook;

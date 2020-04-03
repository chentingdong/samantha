"use strict";

module.exports = {
  // ...require( './src/services/interaction' ),
  ...require("./src/services/webhook"),
  ...require("./src/services/websocket"),
  ...require("./src/services/case-definitions"),
  ...require("./src/services/task-definitions"),
  ...require("./src/services/cases"),
  ...require("./src/services/tasks"),
  ...require("./src/services/case-messages"),
  ...require("./src/services/users"),
};

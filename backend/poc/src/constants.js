"use strict";

module.exports.CONSTANTS = {
  RESPONSE_HEADERS: {
    "Content-Type": "application/json",
    "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  },
};

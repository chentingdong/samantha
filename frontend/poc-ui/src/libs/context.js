import React, { createContext } from 'react';
import Amplify, { Auth } from "aws-amplify";
import config from '../config.js';

Amplify.configure( config );

Auth.currentAuthenticatedUser()
  .then( user => {
    const UserContext = React.createContext( user );
  } );

export {UserContext}
import Amplify, { Auth } from "aws-amplify";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

import config from '../config.js';

function Login () {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  Amplify.configure( config );

  async function handleEmailLogin ( event ) {
    event.preventDefault();
    await Auth.signIn( email, password );
  }

  async function handleFederatedLogin () {
    Auth.federatedSignIn();
  }
  return (
    <div className="m-auto col-5">
      <h3 className="text-center mb-4">Sign in Bellhop Virtual Assistant</h3>
      <Form onSubmit={ handleEmailLogin }>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control"
            type="text"
            value={ email }
            autoComplete='false'
            onChange={ e => setEmail( e.target.value ) }
          />
        </div>
        <div className="form-group" >
          <label>Password</label>
          <input className="form-control"
            value={ password }
            autoComplete="new-password"
            onChange={ e => setPassword( e.target.value ) }
            type="password"
          />
        </div>
        <div className="form-text">
          <p className="text-right">
            <Link to="reset-password"> Forgot password? </Link>
          </p>
        </div>
        <button className="btn btn-light form-control" type="submit">Login</button>
      </Form>
      <hr />
      <button className="btn btn-light form-control" onClick={ handleFederatedLogin }>Login with social accounts</button>
    </div>
  );
}

export default Login;
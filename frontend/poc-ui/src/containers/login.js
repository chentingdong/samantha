import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Amplify, { Auth } from "aws-amplify";
import config from '../config.js';
import LoaderButton from '../components/loader-button';
import { withFederated } from 'aws-amplify-react';


const Federated = withFederated((props) => {
  return (
    <div>
      <LoaderButton className="btn-block" onClick={props.googleSignIn}>
        Login with Google
        </LoaderButton>
      <LoaderButton className="btn-block" onClick={props.facebookSignIn}>
        Login with Facebook
        </LoaderButton>
    </div>
  )
});

function Login (props) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isAuthenticating, setIsAuthenticating ] = useState(false);
  Amplify.configure(config);

  useEffect(() => {
    checkLogin();
  });

  async function checkLogin() {
    try {
      Auth.currentAuthenticatedUser();
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    props.userHasAuthenticated(true);
    setIsAuthenticating(false);
  }

  function validateForm () {
    return email.length > 0 && password.length > 0;
  }

  async function handleEmailLogin(event) {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
    }
  }

  function handleFederatedLogin (state) {
    if (state === 'signedIn') {
      props.userHasAuthenticated(true);
    }
  }

  return (
    !isAuthenticating &&
    <div className="container centered-panel">
      <Form onSubmit={handleEmailLogin}>
        <Form.Group controlId="email" >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            autoComplete='false'
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            autoComplete="new-password"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
        <Form.Text>
          <p className="text-right">
            <Link to="reset-password"> Forgot password? </Link>
          </p>
        </Form.Text>
        <LoaderButton block
          disabled={!validateForm()}
          type="submit"
        >Login</LoaderButton>
        <hr />
        <Federated federated={config.social} onStateChange={handleFederatedLogin} />
      </Form>
    </div>
  );
}

export default Login;
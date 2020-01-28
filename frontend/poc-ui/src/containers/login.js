import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Amplify, { Auth } from "aws-amplify";
import config from '../config.js';
import LoaderButton from '../components/loader-button';
import { withFederated } from 'aws-amplify-react';

const Federated = withFederated((props) => {
  return (
    <div>
      <p>
        <LoaderButton onClick={props.googleSignIn}>Login with Google</LoaderButton>
      </p>
      <p>
        <LoaderButton onClick={props.facebookSignIn}>Login with Facebook</LoaderButton>
      </p>
    </div>
  )
});

function Login (props) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  Amplify.configure(config);

  function validateForm () {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit (event) {
    event.preventDefault();

    try {
      Auth.signIn(email, password).then(() => {
        props.userHasAuthenticated(true);
      })
    } catch (e) {
      console.error(e.message);
    }
  }

  function handleAuthStateChange (state) {
    if (state === 'signedIn') {
      props.userHasAuthenticated(true);
    }
  }

  return (
    <div className="container centered-panel">
      <Form onSubmit={handleSubmit}>
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
          <p>
            <Link to="reset-password"> Forgot password? </Link>
          </p>
        </Form.Text>
        <LoaderButton block
          disabled={!validateForm()}
          type="submit"
        >Login</LoaderButton>
      </Form>
      <hr />
      <Federated federated={config.social} onStateChange={handleAuthStateChange} />
    </div>
  );
}

export default Login;
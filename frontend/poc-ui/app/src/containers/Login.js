import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from '../configs/aws_configs';
import { Link } from 'react-router-dom';
import LoaderButton from '../components/loader-button';

function Login (props) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  Amplify.configure(awsConfig);

  function validateForm () {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit (event) {
    event.preventDefault();

    try {
      const user = await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
    } catch (e) {
      console.error(e.message);
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
        <LoaderButton block disabled={!validateForm()} type="submit">
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}

export default Login;
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from '../config';

Amplify.configure(awsconfig);

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const user = await Auth.signIn(email, password);
      console.log(user)
      props.userHasAuthenticated(true);
      props.history.push('/demo')
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email" >
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
        <Button block  disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Amplify, { Auth } from "aws-amplify";
import config from '../config.js';
import LoaderButton from '../components/loader-button';
import LoginWithGoogle from '../components/login-with-google';

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


  const styles = {
    container: {
      height: '80vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    button: {
      width: '100%',
      maxWidth: 250,
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '0px 16px',
      borderRadius: 2,
      boxShadow: '0px 1px 3px rgba(0, 0, 0, .3)',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      minHeight: 40
    },
    facebook: {
      backgroundColor: "#3b5998"
    },
    email: {
      backgroundColor: '#db4437'
    },
    checkAuth: {
      backgroundColor: '#02bd7e'
    },
    hostedUI: {
      backgroundColor: 'rgba(0, 0, 0, .6)'
    },
    signOut: {
      backgroundColor: 'black'
    },
    withAuthenticator: {
      backgroundColor: '#FF9900'
    },
    icon: {
      height: 16,
      marginLeft: -1
    },
    text: {
      color: 'white',
      fontSize: 14,
      marginLeft: 10,
      fontWeight: 'bold'
    },
    blackText: {
      color: 'black'
    },
    grayText: {
      color: 'rgba(0, 0, 0, .75)'
    },
    orangeText: {
      color: '#FF9900'
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
          text="Login" />
        <hr />
        <LoginWithGoogle />
    <div>
      <div style={styles.container}>
        <button
          style={{ ...styles.button, ...styles.facebook }}
          onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}
        >
          <p style={styles.text}>Sign in with Facebook</p>
        </button>
        <button
          style={{ ...styles.button, ...styles.google }}
          onClick={() => Auth.federatedSignIn({provider: 'Google'})}
        >
          <p style={{...styles.text, ...styles.grayText}}>Sign in with Google</p>
        </button>

        <button
          style={{ ...styles.button, ...styles.hostedUI }}
          onClick={() => Auth.federatedSignIn()}
        >

          <p style={{...styles.text, ...styles.orangeText}}>Sign in with Hosted UI</p>
        </button>
        <button
          style={{ ...styles.button, ...styles.email }}
          onClick={() => props.updateFormState('email')}
        >
          <p style={{...styles.text}}>Sign in with Email</p>
        </button>
      </div>
    </div>
      </Form>
    </div>
  );

}

export default Login;
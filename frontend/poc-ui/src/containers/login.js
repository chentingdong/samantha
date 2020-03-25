import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Amplify, { Auth } from "aws-amplify";
import { withFederated } from 'aws-amplify-react';
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import LoaderButton from '../components/loader-button';
import SignInWithGoogle from "../components/sign-in-with-google.js";
import config from '../config.js';

const Federated = withFederated( ( props ) => {
  return (
    <div className="">
      <LoaderButton className="col-12 btn-light mb-2" onClick={ props.googleSignIn }>
        <FontAwesomeIcon icon={ [ 'fab', 'google' ] } /> Login with Google
      </LoaderButton>
      <LoaderButton className="col-12 btn-light" onClick={ props.facebookSignIn }>
        <FontAwesomeIcon icon={ [ 'fab', 'facebook-f' ] } /> Login with Facebook
      </LoaderButton>
    </div>
  );
} );

function Login ( { userHasAuthenticated } ) {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ isAuthenticating, setIsAuthenticating ] = useState( false );
  Amplify.configure( config );

  function validateForm () {
    return email.length > 0 && password.length > 0;
  }

  async function handleEmailLogin ( event ) {
    event.preventDefault();
    setIsAuthenticating( true );

    try {
      await Auth.signIn( email, password );
      userHasAuthenticated( true );
      setIsAuthenticating( false );
    } catch ( e ) {
      alert( e.message );
    }
  }

  function handleFederatedLogin ( state ) {
    if ( state === 'signedIn' ) {
      userHasAuthenticated( true );
    }
  }

  return (
    !isAuthenticating &&
    <div className="m-auto col-6">
      <Form onSubmit={ handleEmailLogin }>
        <Form.Group controlId="email" >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={ email }
            autoComplete='false'
            onChange={ e => setEmail( e.target.value ) }
          />
        </Form.Group>
        <Form.Group controlId="password" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={ password }
            autoComplete="new-password"
            onChange={ e => setPassword( e.target.value ) }
            type="password"
          />
        </Form.Group>
        <Form.Text>
          <p className="text-right">
            <Link to="reset-password"> Forgot password? </Link>
          </p>
        </Form.Text>
        <LoaderButton isLoading={ isAuthenticating } disabled={ !validateForm() } type="submit" >Login</LoaderButton>
      </Form>
      <hr />
      <SignInWithGoogle userHasAuthenticated={ userHasAuthenticated } />
      <hr />
      <Federated federated={ config.social } onStateChange={ handleFederatedLogin } />
    </div>
  );
}

export default Login;
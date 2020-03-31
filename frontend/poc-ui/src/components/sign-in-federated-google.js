import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import config from '../config';
import apiWrapper from '../libs/api-wrapper';

/**
* @author tchen@bellhop.io
* @function SignInWighGoogle
**/

const createScript = () => {
  const script = document.createElement( 'script' );
  script.src = 'https://apis.google.com/js/platform.js';
  script.async = false;
  script.onload = () => {
    initGapi();
  };
  document.body.appendChild( script );
};

function initGapi () {
  // init the Google SDK client;
  const g = window.gapi;
  g.load( 'auth2', function () {
    g.auth2.init( {
      client_id: config.social.googleClientId,
      // authorized scopes
      scope: 'profile email openid'
    } );
  } );
}

const SignInWithGoogle = ( { className } ) => {
  useEffect( () => {
    const ga = window.gapi && window.gapi.auth2 ?
      window.gapi.auth2.getAuthInstance() :
      null;
    if ( !ga ) {
      createScript();
    }
  }, [] );

  async function signIn () {
    Auth.federatedSignIn();
    // const ga = window.gapi.auth2.getAuthInstance();
    // const googleUser = await ga.signIn();
    // await cognitoSignIn( googleUser );

    // if the google user is not in userPool, redirect user to cognito hostUI to sign up.
    // const username = 'Google_' + googleUser.getId();
    // const path = '/users/' + username;
    // try {
    //   let response = await apiWrapper.get( path );
    //   if ( !response.data ) {
    //     await Auth.federatedSignIn();
    //   }
    // }
    // catch ( err ) {
    //   console.error( `error sign in, ${ err }` );
    // }
  }

  async function cognitoSignIn ( googleUser ) {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    };

    await Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      user
    );
  }

  return (
    <button className={ className } onClick={ signIn }>Sign in with Google</button>
  );
};


export default SignInWithGoogle;
import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import config from '../config';

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

const SignInWithGoogle = ( { userHasAuthenticated } ) => {
  useEffect( () => {
    const ga = window.gapi && window.gapi.auth2 ?
      window.gapi.auth2.getAuthInstance() :
      null;
    if ( !ga ) {
      createScript();
    }
  }, [] );

  async function getAWSCredentials ( googleUser ) {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    };

    const credentials = await Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      user
    );
    if ( credentials ) {
      userHasAuthenticated( true );
      console.log( 'credentials', credentials );
    }
  }

  async function signIn () {
    const ga = window.gapi.auth2.getAuthInstance();
    try {
      const googleUser = await ga.signIn();
      getAWSCredentials( googleUser );
    }
    catch ( err ) {
      console.error( err );
    }
  }

  return (
    <div>
      <button onClick={ signIn }>Sign in with Google</button>
    </div>
  );
};


export default SignInWithGoogle;
import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import config from '../config';

// To federated sign in from Google
class SignInWithGoogle extends Component {
  constructor ( props ) {
    super( props );
    this.signIn = this.signIn.bind( this );
  }

  componentDidMount () {
    const ga = window.gapi && window.gapi.auth2 ?
      window.gapi.auth2.getAuthInstance() :
      null;
    if ( !ga ) this.createScript();
  }

  signIn () {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn().then(
      googleUser => {
        this.getAWSCredentials( googleUser );
      },
      error => {
        console.log( `SignIn error: ${ JSON.stringify( error ) }` );
      }
    );
  }

  getAWSCredentials ( googleUser ) {
    const resp = googleUser.getAuthResponse();
    const { id_token, expires_at } = resp;
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    };

    Auth
      .federatedSignIn( {
        provider: 'google',
        response: { id_token, expires_at },
        user: user
      } )
      .then( credentials => {
        console.log( 'credentials', JSON.stringify( credentials, null, 2 ) );
        return Auth.currentAuthenticatedUser();
      } )
      .catch( err => {
        console.error( err );
      } )
      .then( user => {
        console.log( `user: ${ user }` );
      } )
      .catch( err => {
        console.error( err );
      } );
  }

  createScript () {
    // load the Google SDK
    const script = document.createElement( 'script' );
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = this.initGapi;
    document.body.appendChild( script );
  }

  initGapi () {
    // init the Google SDK client
    const g = window.gapi;
    g.load( 'auth2', function () {
      g.auth2.init( {
        client_id: config.social.googleClientId,
        scope: 'profile email openid'
      } );
    } );
  }

  render () {
    return (
      <div>
        <button onClick={ this.signIn }>Sign in with Google</button>
      </div>
    );
  }
}

export default SignInWithGoogle;
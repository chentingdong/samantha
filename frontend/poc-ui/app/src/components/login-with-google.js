import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from './loader-button';

// To federated sign in from Google
class LoginWithGoogle extends Component {
  constructor (props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount () {
    const ga = window.gapi && window.gapi.auth2 ?
      window.gapi.auth2.getAuthInstance() :
      null;
    if (!ga) this.createScript();
  }

  signIn () {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn().then(
      googleUser => {
        this.getAWSCredentials(googleUser);
      },
      error => {
        console.log(error);
      }
    );
  }

  async getAWSCredentials (googleUser) {
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
    console.log('credentials', credentials);
  }

  createScript () {
    // load the Google SDK
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = this.initGapi;
    document.body.appendChild(script);
  }

  initGapi () {
    // init the Google SDK client
    const g = window.gapi;
    g.load('auth2', function () {
      g.auth2.init({
        client_id: '174411671261-on4eshipqmo66sg8nr16cpmda224tsph.apps.googleusercontent.com',
        scope: 'profile email openid'
      });
    });
  }

  render () {
    return (
      <Button variant="primary" onClick={this.signIn}>Sign in with Google</Button>
    );
  }
}

export default LoginWithGoogle;

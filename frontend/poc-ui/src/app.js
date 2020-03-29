import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Routes from './routes/routes';
import config from './config.js';
import './assets/app.scss';
import buildFonts from './libs/fa-fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App () {
  const [ isAuthenticated, userHasAuthenticated ] = useState( false );
  const [ user, setUser ] = useState( {} );
  buildFonts();
  Amplify.configure( config );

  useEffect( () => {
    async function getUser () {
      let u = await Auth.currentAuthenticatedUser();
      if ( u ) {
        userHasAuthenticated( true );
      }
    };

    getUser();
  }, [] );

  async function federatedSignUp () {
    try {
      const credentials = await Auth.federatedSignIn();
      if ( credentials ) {
        userHasAuthenticated( true );
        console.log( 'credentials', credentials );
      }
    }
    catch ( err ) {
      console.error( err );
    }
  }

  async function handleLogout () {
    try {
      // const ga = window.gapi.auth2.getAuthInstance();
      // await ga.signOut();
      await Auth.signOut();
      setUser( null );
      userHasAuthenticated( false );
    }
    catch ( e ) {
      console.error( e );
    };
  }

  return (
    <div className="app wrapper vh-100">
      <BrowserRouter>
        <div className="d-flex align-items-start flex-column bg-secondary app-nav">
          <div className="mb-auto bd-highlight">
            <Nav.Link className="nav-link tex·t-success" as={ NavLink } to="/home" >
              <h3>
                <FontAwesomeIcon icon="home" />
              </h3>
            </Nav.Link>
            <Nav.Link className="nav-link text-success" as={ NavLink } to="/">
              <h3>
                <FontAwesomeIcon icon="th" />
              </h3>
            </Nav.Link>
          </div>
          <div className="bd-highlight">
            { isAuthenticated
              ?
              <>
                <Nav.Link className="text-success" as={ NavLink } to="/user/settings">
                  <h3>
                    <FontAwesomeIcon icon="cog" />
                  </h3>
                </Nav.Link>
                <Nav.Link className="nav-link text-success" onClick={ handleLogout }>
                  <h3>
                    <FontAwesomeIcon icon="sign-out-alt" />
                  </h3>
                </Nav.Link>
              </>
              :
              <>
                <Nav.Link className="nav-link text-success" onClick={ federatedSignUp }>
                  <h3>
                    <FontAwesomeIcon icon="user-plus" />
                  </h3>
                </Nav.Link>
                <Nav.Link className="nav-link text-success" as={ NavLink } to="/user/login">
                  <h3>
                    <FontAwesomeIcon icon="sign-in-alt" />
                  </h3>
                </Nav.Link>
              </>
            }
          </div>
        </div>
        <Routes appProps={ { isAuthenticated, userHasAuthenticated, user } } />
      </BrowserRouter>
    </div>
  );
}


export default App;
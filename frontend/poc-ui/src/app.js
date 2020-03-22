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
  buildFonts();
  Amplify.configure( config );

  useEffect( () => {
    checkLogin();
  }, [] );

  async function checkLogin () {
    Auth
      .currentAuthenticatedUser()
      .then( () => {
        userHasAuthenticated( true );
      } )
      .catch( ( e ) => {
        console.error( e );
      } );
  }

  function handleLogout () {
    Auth.signOut()
      .then( () => {
        userHasAuthenticated( false );
      } )
      .catch( ( e ) => {
        console.error( e );
      } );
  }

  return (
    <div className="app wrapper vh-100">
      <BrowserRouter>
        <div className="d-flex align-items-start flex-column bg-secondary app-nav">
          <div className="mb-auto bd-highlight">
            <Nav.Link className="nav-link text-success" as={ NavLink } to="/home" >
              <h3>
                <FontAwesomeIcon icon="home" />
              </h3>
            </Nav.Link>
            <Nav.Link className="nav-link text-success" as={ NavLink } to="/demo">
              <h3>
                <FontAwesomeIcon icon="th-large" />
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
                <Nav.Link className="nav-link text-success" as={ NavLink } to="/user/signup">
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
        <Routes className="fixed-right" appProps={ { isAuthenticated, userHasAuthenticated } } />
      </BrowserRouter>
    </div>
  );
}


export default App;
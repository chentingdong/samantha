import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Routes from './routes/routes';
import config from './config.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import logo from './assets/bellhop.png';
import { UserContext } from './libs/context';

// Import and build a fontawesome icon library to share in the app
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faPlus, faEye, faFlag, faBomb, faCircleNotch, faUser, faUserCog, faRobot, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
library.add( faBell, faPlus, faEye, faFlag, faBomb, faCircleNotch, faUser, faUserCog, faRobot, faProjectDiagram );


function App () {
  const [ isAuthenticated, userHasAuthenticated ] = useState( false );

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
    <div className="app container-fluid">
      <BrowserRouter>
        <Navbar bg="light" expand="lg" className="row">
          <Navbar.Brand>
            <Nav.Link as={NavLink} to="/">
              <img className="app-logo" src={logo} alt="Bellhop" />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {isAuthenticated
                ?
                <>
                  <Nav.Link as={NavLink} to="/user/settings"> Settings </Nav.Link>
                  <Nav.Link className="clickable" onClick={handleLogout}> Logout </Nav.Link>
                </>
                :
                <>
                  <Nav.Link as={NavLink} className="nav-link" to="/user/signup"> Signup </Nav.Link>
                  <Nav.Link as={NavLink} className="nav-link" to="/user/login"> Login </Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </BrowserRouter>
    </div>
  );
}


export default App;
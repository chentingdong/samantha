import React, { useState, useEffect } from 'react'
import Amplify, {Auth} from 'aws-amplify'
import { BrowserRouter, Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import Routes from './routes/routes'
import config from './config.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import logo from './assets/astound.png'

function App () {
  const [ isAuthenticated, userHasAuthenticated ] = useState(false)

  Amplify.configure(config)

  useEffect ( () => {
    checkLogin();
  }, [])

  async function checkLogin () {
    try {
      // Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') alert(e)
    }
  }

  async function handleLogout () {
    try {
      await Auth.signOut();
      userHasAuthenticated(false)
    }
    catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="app container-fluid">
      <BrowserRouter>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link className="nav-link" to="/">
            <img className="app-logo" src={logo} alt=""/>
            <span className="brand">Astound.ai</span>
          </Link>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ml-auto">
              {isAuthenticated
                ? <>
                    <Nav.Item>
                      <Nav.Link href="/settings"> Settings </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={handleLogout}> Logout </Nav.Link>
                    </Nav.Item>
                  </>
                : <>
                    <Nav.Item>
                      <Nav.Link className="nav-link" href="/user/signup"> Signup </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-link" href="/user/login"> Login </Nav.Link>
                    </Nav.Item>
                  </>
              }
            </div>
          </div>
        </nav>
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </BrowserRouter>
    </div>
  )
}


export default App;
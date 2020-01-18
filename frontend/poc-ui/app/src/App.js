import React, { useState, useEffect } from 'react'
import Amplify from 'aws-amplify'
import './app.css'
import { BrowserRouter, Link } from 'react-router-dom'
import cognitoConfig from './configs/cognito'
import Routes from './routes/routes'
import logo from './assets/astound.png'

function App () {
  const [ isAuthenticated, userHasAuthenticated ] = useState(false)

  useEffect( () => {
    Amplify.configure(cognitoConfig)
  })

  function handleLogout () {
    userHasAuthenticated(false)
    // TODO: findout why above doesn't fully work, and remove below.
    window.location.href=('/login')
  }

  return (
    <div className="app">
      <BrowserRouter>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link className="nav-link" to="/">
            <img className="app-logo" src={logo} alt=""/>
            <span>Astound</span>
          </Link>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ml-auto">
              {isAuthenticated
                ? <button type="button" className="btn btn-light" onClick={handleLogout}>Logout</button>
                : <>
                  <Link className="nav-link" to="/signup"> Signup </Link>
                  <Link className="nav-link" to="/login"> login </Link>
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

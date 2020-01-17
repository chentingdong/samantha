import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import Amplify from 'aws-amplify'
import logo from '../assets/astound.png'
import { createBrowserHistory } from 'history';

import Routes from './Routes'
import awsconfig from '../aws-exports'

function Header () {
  const [ isAuthenticated, userHasAuthenticated ] = useState(false)
  let appProps = { isAuthenticated, userHasAuthenticated }
  let history = createBrowserHistory()

  useEffect( () => {
    Amplify.configure(awsconfig)
  })

  function handleLogout () {
    userHasAuthenticated(false)
    history.push('/login')
    // TODO: findout why above doesn't work, and remove below.
    window.location.href=('/login')
  }

  return (
    <div className="app">
      <BrowserRouter history={history}>
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
                : <Link className="nav-link" to="/login"> login </Link>
              }
            </div>
          </div>
        </nav>
        <Routes appProps={appProps} />
      </BrowserRouter>
    </div>
  )
}

export default Header;

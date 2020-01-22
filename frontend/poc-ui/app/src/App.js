import React, { useState } from 'react'
import Amplify from 'aws-amplify'
import { BrowserRouter, Link } from 'react-router-dom'
import Routes from './routes/routes'
import awsConfig from './configs/aws_configs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import logo from './assets/astound.png'

function App () {
  const [ isAuthenticated, userHasAuthenticated ] = useState(false)
  Amplify.configure(awsConfig)

  function handleLogout () {
    userHasAuthenticated(false)
    // history is not setup yet, use hard redirect here.
    // React may need to solve this, to support history in top level component.
    window.location.href=('/login')
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
                ? <button type="button" className="btn btn-light" srsronClick={handleLogout}>Logout</button>
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

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
  const [ isAuthenticating, setIsAuthenticating] = useState(true);
  const [ isAuthenticated, userHasAuthenticated ] = useState(false)

  Amplify.configure(config)

  useEffect ( () => {
    checkLogin();
  }, [])

  async function checkLogin () {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') alert(e)
      setIsAuthenticating(false)
    }
  }

  async function checkFBLogin () {
    this.loadFacebookSDK();

    try {
      await Auth.currentAuthenticatedUser();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "not authenticated") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  function loadFacebookSDK () {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : config.social.FB,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.1'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  function handleLogout () {
    userHasAuthenticated(false)
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
                      <Nav.Link className="nav-link" href="/signup"> Signup </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-link" href="/login"> Login </Nav.Link>
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
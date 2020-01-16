import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import VirtualAgent from './containers/VirtualAgent';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';

function App() {
  const routes = [
    {
      path: "/user/login",
      component: Login
    },
    {
      path: "/user/register",
      component: Signup
    },
    {
      path: "/",
      component: VirtualAgent
    }
  ];

  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">VirtualAgent</Link>
              </li>
              <li className="nav-item mr-auto">
                <Link className="nav-link" to="/login">login</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            {routes.map((route, i) => (
              <Route path={route.path} key={i}>
                <route.component />
              </Route>
            ))}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

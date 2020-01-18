import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'

import VirtualAgent from './containers/virtual-agent'
import Home from './containers/home'
import Login from './containers/login'
import Signup from './containers/signup'
import NotFound from './containers/not-found'

function Routes ({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/demo" exact component={VirtualAgent} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      { /* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

// pass appProps to child component, other props to Route component
function AppliedRoute ({ component: Component, appProps, ...rest }) {
  return (
    <Route {...rest} render={(props) => (
      <Component {...props} {...appProps} />
    )} />
  );
}

// private route
function PrivateRoute ({ component: Component, appProps, ...rest }) {
  return (
    <Route {...rest} render={(props) => (
      props.isAuthenticated === true
        ? <Component {...props} {...appProps} />
        : <Redirect to='/login' {...props} {...appProps}/>
    )} />
  );
}

export default Routes;
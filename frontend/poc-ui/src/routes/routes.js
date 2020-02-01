import React from "react";
import { Switch } from 'react-router-dom'

import VirtualAgent from '../containers/virtual-agent'
import Suggest from '../containers/suggest-agent'
import Home from '../containers/home'
import Login from '../containers/login'
import Signup from '../containers/signup'
import Settings from '../containers/settings'
import ResetPassword from '../containers/reset-password'
import NotFound from '../containers/not-found'
import PublicRoute from './public-routes'
import PrivateRoute from './private-routes'
import VirtualAssistant from "../containers/virtual-assistant";

function Routes ({ appProps }) {
  return (
    <Switch>
      <PublicRoute path="/" exact component={Home} appProps={appProps} />
      <PrivateRoute path="/demo" exact component={VirtualAssistant} appProps={appProps} />
      <PrivateRoute path="/demo1" exact component={VirtualAgent} appProps={appProps} />
      <PrivateRoute path="/demo-suggest" exact component={Suggest} appProps={appProps} />
      <PublicRoute path="/login" exact component={Login} appProps={appProps} />
      <PrivateRoute path="/settings" exact component={Settings} appProps={appProps} />
      <PublicRoute path="/reset-password" exact component={ResetPassword} appProps={appProps} />
      <PublicRoute path="/signup" exact component={Signup} appProps={appProps} />
      { /* Finally, catch all unmatched routes */}
      <PublicRoute component={NotFound} appProps={appProps} />
    </Switch>
  );
}

export default Routes
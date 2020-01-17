import React from "react";
import { Switch, Route } from 'react-router-dom'

import VirtualAgent from '../containers/VirtualAgent'
import Home from '../containers/Home'
import Login from '../containers/Login'
import NotFound from '../containers/NotFound'
import AppliedRoute from './AppliedRoute'

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/VirtualAgent" exact component={VirtualAgent} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}

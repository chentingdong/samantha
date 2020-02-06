import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute ({ component: Component, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
          ? <Component {...props} {...appProps} />
          : <Redirect to={`/user/login?redirect=${props.location.pathname}${props.location.search}`} />}
    />
  );
}
import React from "react";
import { Route } from "react-router-dom";

// copied from stackoverflow, don't trust it.
export default function AppliedRoute({ component: Comp, appProps, ...rest }) {
  return (
    <Route {...rest} render={props => <Comp {...props} {...appProps} />} />
  );
}

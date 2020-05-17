import * as React from "react"
import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { Context } from "../context/store"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { state } = useContext(Context)
  return (
    <Route
      {...rest}
      render={(props) => {
        const redirect = props.location.pathname + props.location.search
        return state.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login?redirect=${redirect}`} />
        )
      }}
    />
  )
}

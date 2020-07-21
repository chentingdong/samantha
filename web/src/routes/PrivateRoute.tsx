import React from "react"
import { Route } from "react-router-dom"
import { AUTH_USER } from "../operations/queries/authUser"
import { useQuery } from "@apollo/client"
import { Redirect } from "components/Redirect"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { data } = useQuery(AUTH_USER)

  return (
    <Route
      {...rest}
      render={(props) => {
        const redirect = props.location.pathname + props.location.search
        return data?.authUser?.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login?redirect=${redirect}`} delay={3000} />
        )
      }}
    />
  )
}

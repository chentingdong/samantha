import * as React from "react"
import { Route, Redirect } from "react-router-dom"
import { IS_AUTHENTICATED } from "../operations/queries/isAuthenticated"
import { useQuery } from "@apollo/client"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { data } = useQuery(IS_AUTHENTICATED)
  return (
    <Route
      {...rest}
      render={(props) => {
        const redirect = props.location.pathname + props.location.search
        return data?.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login?redirect=${redirect}`} />
        )
      }}
    />
  )
}

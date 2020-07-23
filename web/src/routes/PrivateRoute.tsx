import React from "react"
import { Route } from "react-router-dom"
import { AUTH_USER } from "../operations/queries/authUser"
import { useQuery } from "@apollo/client"
import { Redirect } from "components/Redirect"

export default function PrivateRoute({ component: Component, ...props }) {
  const { data, loading } = useQuery(AUTH_USER)

  const redirect = props.location.pathname + props.location.search

  if (data?.authUser?.isAuthenticated)
    return (
      <Route {...props}>
        <Component {...props} />
      </Route>
    )
  if (loading) return <>Loading...</>
  else return <Redirect to={`/login?redirect=${redirect}`} delay={3000} />
}

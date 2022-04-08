import { AUTH_USER } from "../operations/queries/authUser"
import React from "react"
import { Redirect } from "components/Redirect"
import { Route } from "react-router-dom"
import { useQuery } from "@apollo/client"

export default function PrivateRoute({ component: Component, ...props }) {
  const { data, loading, error } = useQuery(AUTH_USER)
  const redirect = props.location.pathname + props.location.search
  
  if (loading) return <>Loading...</>
  if (error) return <>error...</>
  if (data?.authUser?.isAuthenticated)
    return (
      <Route exact {...props}>
        <Component {...props} {...props.params} />
      </Route>
    )
  else return <Redirect to={`/login?redirect=${redirect}`} delay={2000} />
}

import * as React from "react"
import { Route, Redirect } from "react-router-dom"
import { IS_AUTHENTICATED } from "../operations/queries/isAuthenticated"
import { useQuery } from "@apollo/client"

function querystring(name: string, url: string = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&")

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i")
  const results = regex.exec(url)

  if (!results) {
    return null
  }
  if (!results[2]) {
    return ""
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export default function PublicRoute({ component: Component, ...rest }) {
  const redirect = querystring("redirect")
  const { data } = useQuery(IS_AUTHENTICATED)
  return (
    <Route
      {...rest}
      render={(props) =>
        !data?.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={redirect === "" || redirect === null ? "/" : redirect}
          />
        )
      }
    />
  )
}

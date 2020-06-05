import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import Login from "../app/Login"
import NotFound from "../app/NotFound"
import { Demo } from "../app/Demo"

const routes = [
  {
    path: "/",
    component: Demo,
    tag: PrivateRoute,
  },
  {
    path: ["/login", "/logout"],
    component: Login,
    tag: PublicRoute,
  },
  {
    component: NotFound,
    tag: PublicRoute,
  },
]

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => {
          const TagName = route.tag
          return (
            <TagName
              exact
              path={route.path}
              component={route.component}
              key={index}
              className="vh-100"
            />
          )
        })}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import Login from "../app/Login"
import NotFound from "../app/NotFound"
import { Demo as DemoM1 } from "../app/M1/Demo"
import { Demo as DemoM2 } from "../app/M2/Demo"

const routes = [
  {
    path: "/",
    component: DemoM2,
    tag: PrivateRoute,
  },
  {
    path: "/m1",
    component: DemoM1,
    tag: PrivateRoute,
  },
  {
    path: "/m2",
    component: DemoM2,
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

const Routes = () => {
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

import React from "react"
import { BrowserRouter, Switch, Redirect } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import Login from "../app/Login"
import NotFound from "../app/NotFound"
import { Demo } from "../app/M2/Demo"
import { Demo as DemoM1 } from "../app/M1/Demo"

const routes = [
  {
    path: "/lobby",
    component: Demo,
    tag: PrivateRoute,
  },
  {
    path: "/bellhops/:desk?/:bellhopId?",
    component: Demo,
    tag: PrivateRoute,
  },
  {
    path: "/bells/:bellId?/:goalId?/:context?/:taskId?",
    component: Demo,
    tag: PrivateRoute,
  },
  {
    path: "/m1",
    component: DemoM1,
    tag: PrivateRoute,
  },
  {
    path: ["/login", "/logout"],
    component: Login,
    tag: PublicRoute,
  },
  {
    path: "/",
    component: Redirect,
    tag: PrivateRoute,
    params: { to: "/lobby" },
  },
  {
    path: "*",
    component: NotFound,
    tag: PrivateRoute,
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
              path={route.path}
              component={route.component}
              params={route.params}
              key={index}
              className="vh-100"
            />
          )
        })}
      </Switch>
      <React.Fragment />
    </BrowserRouter>
  )
}

export default Routes

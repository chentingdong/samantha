import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import Login from "../app/Login"
import NotFound from "../app/NotFound"
import { Demo as DemoM1 } from "../app/M1/Demo"
import { Lobby } from "app/M2/Lobby"
import { CompanyBellDesk } from "app/M2/CompanyBellDesk"
import { MyBellDesk } from "app/M2/MyBellDesk"
import { Bell } from "app/M2/Bell"

const routes = [
  {
    path: "/lobby",
    component: Lobby,
    tag: PrivateRoute,
  },
  {
    path: "/company-bell-desk",
    component: CompanyBellDesk,
    tag: PrivateRoute,
  },
  {
    path: "/company-bell-desk/bellhops/:bellhopId",
    component: CompanyBellDesk,
    tag: PrivateRoute,
  },
  {
    path: "/my-bell-desk",
    component: MyBellDesk,
    tag: PrivateRoute,
  },
  {
    path: "/my-bell-desk/bellhops/:bellhopId",
    component: MyBellDesk,
    tag: PrivateRoute,
  },
  {
    path: "/bells/:bellId",
    component: Bell,
    tag: PrivateRoute,
  },
  {
    path: "/bells/:bellId/:goalId?/:context?/:details?",
    component: Bell,
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
    component: Lobby,
    tag: PrivateRoute,
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
              exact
              path={route.path}
              component={route.component}
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

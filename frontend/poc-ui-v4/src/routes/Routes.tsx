import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import Login from "../pages/Login"
import NotFound from "../pages/NotFound"
import { HeaderWithRouter } from "../components/Header"
import { RequestCatalogList } from "../components/RequestCatalogList"
import { RequestsMadeList } from "../components/RequestsMadeList"
import { RequestsReceivedList } from "../components/RequestsReceivedList"
import { ContextViewCodes } from "../components/ContextViewCodes"
import { Demo } from "../components/Demo"

const routes = [
  {
    path: "/",
    component: Demo,
    tag: PrivateRoute,
  },
  {
    path: "/demo",
    component: Demo,
    tag: PrivateRoute,
  },
  {
    path: "/requests-made",
    component: RequestsMadeList,
    tag: PrivateRoute,
  },
  {
    path: "/requests-received",
    component: RequestsReceivedList,
    tag: PrivateRoute,
  },
  {
    path: "/context-viewer",
    component: ContextViewCodes,
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

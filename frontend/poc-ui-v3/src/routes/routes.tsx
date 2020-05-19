import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PublicRoute from "./public-routes"
import PrivateRoute from "./private-routes"
import Login from "../pages/Login"
import NotFound from "../pages/NotFound"
import { HeaderWithRouter } from "../pages/Header"
import { RequestCatalogList } from "../containers/RequestCatalogList"
import { RequestsMadeList } from "../containers/RequestsMadeList"
import { RequestsReceivedList } from "../containers/RequestsReceivedList"
import { ContextViewCodes } from "../containers/ContextViewCodes"

const routes = [
  {
    path: "/",
    component: RequestCatalogList,
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
      <HeaderWithRouter />
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

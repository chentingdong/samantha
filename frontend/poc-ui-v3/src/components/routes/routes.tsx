import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PublicRoute from "./public-routes"
import PrivateRoute from "./private-routes"
import Login from "../pages/login"
import NotFound from "../pages/not-found"
import { RequestCatalogList } from "../blocks/RequestCatalogList"
import { RequestsMadeList } from "../blocks/RequestsMadeList"
import { RequestsReceivedList } from "../blocks/RequestsReceivedList"
import { ContextViewCodes } from "../pages/ContextViewCodes"
import { HeaderWithRouter } from "../pages/header"

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
    path: "/login",
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

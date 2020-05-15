import * as React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import PublicRoute from "./public-routes"
import PrivateRoute from "./private-routes"
import VirtualAssistant from "../pages/virtual-assistant"
import Login from "../pages/login"
import NotFound from "../pages/not-found"
import { RequestCatalogList } from "../blocks/RequestCatalogList"
import { BlockCatalogList } from "../blocks/BlockCatalogList"
import { RequestsMadeList } from "../blocks/RequestsMadeList"
import { RequestsReceivedList } from "../blocks/RequestsReceivedList"
import { RequestorSurface } from "../block/RequestorSurface"
import { ResponderSurface } from "../block/ResponderSurface"

const routes = [
  {
    path: "/request-catalog",
    component: RequestCatalogList,
    tag: PrivateRoute,
  },
  {
    path: "/block-catalog",
    component: BlockCatalogList,
    tag: PrivateRoute,
  },
  {
    path: "/requests-made",
    component: RequestsMadeList,
    tag: PrivateRoute,
  },
  {
    path: "/request-received",
    component: RequestsReceivedList,
    tag: PrivateRoute,
  },
  {
    path: "/requestor-surface/:id",
    component: RequestorSurface,
    tag: PrivateRoute,
  },
  {
    path: "/responder-surface/:id",
    component: ResponderSurface,
    tag: PrivateRoute,
  },
  {
    path: "/",
    component: VirtualAssistant,
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

import * as React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import PublicRoute from './public-routes'
import PrivateRoute from './private-routes'
import VirtualAssistant from '../pages/virtual-assistant.js'
import Login from '../pages/login'
import NotFound from '../pages/not-found'

const routes = [
  {
    path: '/',
    component: VirtualAssistant,
    tag: PrivateRoute,
  },
  {
    path: '/login',
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
            />
          )
        })}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

import * as React from 'react'
import { Switch } from 'react-router-dom'
import PublicRoute from './public-routes'
import PrivateRoute from './private-routes'
import VirtualAssistant from '../pages/virtual-assistant'

const routes = [
  {
    path: '/demo',
    component: VirtualAssistant,
    tag: PrivateRoute,
  },
]

function Routes({ appProps }) {
  return (
    <Switch>
      {routes.map((route, index) => {
        const TagName = route.tag
        return (
          <TagName
            exact
            path={route.path}
            component={route.component}
            appProps={appProps}
            key={index}
          />
        )
      })}
    </Switch>
  )
}

export default Routes

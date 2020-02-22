import React from "react";
import { Switch } from 'react-router-dom'

import VirtualAgent from '../containers/virtual-agent'
import Suggest from '../containers/suggest-agent'
import Home from '../containers/home'
import Login from '../containers/login'
import Signup from '../containers/signup'
import Settings from '../containers/settings'
import ResetPassword from '../containers/reset-password'
import NotFound from '../containers/not-found'
import PublicRoute from './public-routes'
import PrivateRoute from './private-routes'
import VirtualAssistant from '../containers/virtual-assistant'
import Workflow from '../containers/workflow'
import Workflow1 from '../containers/workflow.1'
import NodeTypes from '../containers/node-types'
import MineSweeper from '../games/mine-sweeper'

const routes = [
  {
    path: "/",
    component: Home,
    tag: PublicRoute
  },
  {
    path: "/user/user/signup",
    component: {Signup},
    tag: PublicRoute
  },
  {
    path: "/user/login",
    component: Login,
    tag: PublicRoute
  },
  {
    path: "/user/settings",
    component: Settings,
    tag: PrivateRoute
  },
  {
    path: "/user/password/reset",
    component: ResetPassword,
    tag: PrivateRoute
  },
  {
    path: "/demo",
    component: VirtualAssistant,
    tag: PrivateRoute
  },
  {
    path: "/demo/agent-widget",
    component: VirtualAgent,
    tag: PrivateRoute
  },
  {
    path: "/demo/suggest",
    component: Suggest,
    tag: PrivateRoute
  },
  {
    path: "/ideas/workflow",
    component: Workflow,
    tag: PrivateRoute
  },
  {
    path: "/ideas/workflow-1",
    component: Workflow1,
    tag: PrivateRoute
  },
  {
    path: '/ideas/state-types',
    component: NodeTypes,
    tag: PrivateRoute
  },
  {
    path: "/games/minesweeper",
    component: MineSweeper,
    tag: PrivateRoute
  },
  // last, catch everything else as 404
  {
    component: NotFound,
    tag: PrivateRoute
  }
]

function Routes ({ appProps }) {
  return (
    <Switch>
      {routes.map((route, index) => {
        const TagName = route.tag || 'foo'
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
  );
}

export default Routes
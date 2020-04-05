import React from "react";
import { Switch } from "react-router-dom";

import Suggest from "../ideas/suggest-agent";
import Home from "../containers/home";
import Login from "../user/login";
import Signup from "../user/signup";
import Settings from "../user/settings";
import ResetPassword from "../user/reset-password";
import NotFound from "../containers/not-found";
import PublicRoute from "./public-routes";
import PrivateRoute from "./private-routes";
import VirtualAssistant from "../containers/virtual-assistant";
import Workflow from "../ideas/workflow";
import Workflow1 from "../ideas/workflow.1";
import NodeTypes from "../ideas/node-types";
import MineSweeper from "../games/mine-sweeper";

const routes = [
  {
    path: "/",
    component: Login,
    tag: PublicRoute,
  },
  {
    path: "/user/login",
    component: Login,
    tag: PublicRoute,
  },
  {
    path: "/user/signup",
    component: Signup,
    tag: PublicRoute,
  },
  {
    path: "/user/settings",
    component: Settings,
    tag: PrivateRoute,
  },
  {
    path: "/user/password/reset",
    component: ResetPassword,
    tag: PrivateRoute,
  },
  {
    path: "/home",
    component: Home,
    tag: PrivateRoute,
  },
  {
    path: "/demo",
    component: VirtualAssistant,
    tag: PrivateRoute,
  },
  {
    path: "/demo/suggest",
    component: Suggest,
    tag: PrivateRoute,
  },
  {
    path: "/ideas/workflow",
    component: Workflow,
    tag: PrivateRoute,
  },
  {
    path: "/ideas/workflow-1",
    component: Workflow1,
    tag: PrivateRoute,
  },
  {
    path: "/ideas/state-types",
    component: NodeTypes,
    tag: PrivateRoute,
  },
  {
    path: "/games/minesweeper",
    component: MineSweeper,
    tag: PrivateRoute,
  },
  // last, catch everything else as 404
  {
    component: NotFound,
    tag: PublicRoute,
  },
];

function Routes({ appProps }) {
  return (
    <Switch>
      {routes.map((route, index) => {
        const TagName = route.tag;
        return (
          <TagName
            exact
            path={route.path}
            component={route.component}
            appProps={appProps}
            key={index}
          />
        );
      })}
    </Switch>
  );
}

export default Routes;

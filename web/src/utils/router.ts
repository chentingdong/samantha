/**
 * Extract single bell page router parameters
 * For fragment pages, we use location rather than props.computedMatch.
 * React fragment doesn't get params from route match in router.
 * @param location: the url location
 */

import { RouterUrlProps } from "models/interface"
import { matchPath } from "react-router-dom"

const getRouteParams = (location: Location): RouterUrlProps => {
  const matchMenu = matchPath(location.pathname, {
    path: "/:menu",
  })
  const menu = matchMenu?.params["menu"]
  switch (menu) {
    case "lobby":
      return { menu: "lobby" }
    case "bells":
      let path = "/bells/:bellId/:goalId?/:context?/:taskId?"
      let match = matchPath(location.pathname, { path: path })
      return {
        menu: "bells",
        bellId: match?.params["bellId"] || "all",
        goalId: match?.params["goalId"] || "all",
        context: match?.params["context"] || "activities",
        taskId: match?.params["taskId"] || "all",
      }
    case "bellhops":
      path = "/bellhops/:desk?/:bellhopId?"
      match = matchPath(location.pathname, { path: path })
      return {
        menu: "bellhops",
        desk: match?.params["desk"],
        bellhopId: match?.params["bellhopId"],
      }
  }
}

const buildRouterUrl = (params: RouterUrlProps): string => {
  const { bellId, goalId, context, taskId } = params
  console.log(goalId, context, taskId)
  const url = `/bells/${bellId}/${goalId}/${context}/${taskId}`
  return url
}

export { getRouteParams, buildRouterUrl }

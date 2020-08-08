import { matchPath } from "react-router-dom"
import { Block, RouterUrlProps } from "models/interface"

/* list to tree. node has parent_id field.*/
const listToTree = (list: Array<any>) => {
  const map = {}
  let node
  const roots = []
  let i

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i
    list[i].children = []
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    if (node.parent_id !== null) {
      list[map[node.parent_id]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}

/**
 * input: list of items with parent_id references
 * output: list with children generations for html display.
 */
const listTreeGenerations = (list: Array<any>) => {
  const roots = listToTree(list)
  const result = []
  const traverse = (roots, generation) => {
    roots?.forEach((root) => {
      root.className = "generation-" + generation
      result.push(root)
      const children = root.children
      delete root.children

      traverse(children, generation + 1)
    })
  }
  traverse(roots, 1)
  return result
}

/**
 * Extract single bell page router parameters
 * For fragment pages, we use location rather than props.computedMatch.
 * React fragment doesn't get params from route match in router.
 * @param location: the url location
 */

const getRouteParams = (location: Location): RouterUrlProps => {
  const match = matchPath(location.pathname, {
    path: "/bells/:bellId/:goalId?/:context?/:taskId?",
  })
  const bellId = match?.params.bellId
  const goalId = match?.params.goalId || "all"
  const context = match?.params.context || "activities"
  const taskId = match?.params.taskId || "all"

  return { bellId: bellId, goalId: goalId, context: context, taskId: taskId }
}

const getBellhopLocationParams = (location: Location) => {
  const match = matchPath(location.pathname, {
    path: "/:menuItem/bellhops/:bellhopId?",
  })
  const menuItem = match?.params.menuItem
  const bellhopId = match?.params.bellhopId

  return {
    menuItem: menuItem,
    bellhopId: bellhopId,
  }
}

const buildRouterUrl = (params: RouterUrlProps): string => {
  const { bellId, goalId, context, taskId } = params
  console.log(goalId, context, taskId)
  const url = `/bells/${bellId}/${goalId}/${context}/${taskId}`
  return url
}

/**
 * In a goal, count notifications and finished tasks
 * @param goal
 */

const countCompletedTasks = (goal: Block, tasks: Block[]): number => {
  if (!goal || !tasks) return 0
  const completed = tasks
    .filter((task) => task.state === "Success")
    .filter(
      (task) =>
        task.parent_id === goal.id ||
        task.parent?.parent_id === goal.id ||
        task.parent?.parent?.parent_id === goal.id
    )
  return completed.length
}
const countNotifications = (goal: Block, notifications: Block): number => {
  const goalNotifications = notifications.filter(
    (notif) => notif.parent_id === goal.id
  )
  return goalNotifications.length
}

export {
  listToTree,
  listTreeGenerations,
  getRouteParams,
  getBellhopLocationParams,
  buildRouterUrl,
  countCompletedTasks,
  countNotifications,
}

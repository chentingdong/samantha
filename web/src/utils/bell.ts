import { matchPath } from "react-router-dom"

/* list to tree */

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
 * output: tree with only level 2 & 3, skip root (1) and combine 3 and 3+ to 3.
 */
const listTree23Level = (list: Array<any>) => {
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

const getBellLocationParams = (location: Location) => {
  const match = matchPath(location.pathname, {
    path: "/bells/:bellId/:goalId?/:context?/:details?",
  })
  const bellId = match?.params.bellId
  const goalId = match?.params.goalId || "all"
  const context = match?.params.context || "activities"
  const details = match?.params.details || ""

  return { bellId: bellId, goalId: goalId, context: context, details: details }
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
/**
 * In a goal, count notifications and finished tasks
 * @param goal
 */

const countCompletedTasks = (goal, tasks) => {
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
const countNotifications = (goal, notifications) => {
  const goalNotifications = notifications.filter(
    (notif) => notif.parent_id === goal.id
  )
  return goalNotifications.length
}

export {
  listToTree,
  listTree23Level,
  getBellLocationParams,
  getBellhopLocationParams,
  countCompletedTasks,
  countNotifications,
}

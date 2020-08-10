import { Block } from "models/interface"

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
 * In a goal, count notifications and finished tasks
 * @param goal
 */

const countGoalTasks = (
  goal: Block,
  tasks: Block[],
  states = ["Success", "Failure"]
): number => {
  if (!goal || !tasks) return 0

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.parent_id === goal.id ||
        task.parent?.parent_id === goal.id ||
        task.parent?.parent?.parent_id === goal.id
    )
    .filter((task) => states.indexOf(task.state) > -1)

  return filteredTasks.length
}
const countGoalNotifications = (goal: Block, notifications: Block): number => {
  const goalNotifications = notifications.filter(
    (notif) => notif.parent_id === goal.id
  )
  return goalNotifications.length
}

export {
  listToTree,
  listTreeGenerations,
  countGoalTasks,
  countGoalNotifications,
}

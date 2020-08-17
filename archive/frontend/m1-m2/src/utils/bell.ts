import { Block, Artifact } from "models/interface"

/* list to tree. node has parent_id field.*/
const listToTree = (list: Array<unknown>): Array<unknown> => {
  if (!list) return []
  const map = {}
  let node
  const roots = []
  let i

  for (i = 0; i < list.length; i += 1) {
    map[list[i]["id"]] = i
    list[i]["children"] = []
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    if (node.parent_id !== null) {
      list[map[node.parent_id]]["children"].push(node)
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
const listTreeGenerations = (list: Array<unknown>): Array<unknown> => {
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

const filterGoalTasks = (
  goal: Block,
  tasks: Block[],
  states = ["Success", "Failure"]
): Block[] => {
  if (!goal || !tasks) tasks
  return tasks
    ?.filter(
      (task) =>
        task.parent_id === goal.id ||
        task.parent?.parent_id === goal.id ||
        task.parent?.parent?.parent_id === goal.id
    )
    ?.filter((task) => states.indexOf(task.state) > -1)
}

const filterGoalNotifications = (
  goals: Block[],
  notifications: Block[]
): Block[] =>
  notifications?.filter(
    (notification) =>
      goals?.filter((goal) => goal?.id === notification.parent?.id).length > 0
  )

const filterGoalArtifacts = (
  bellId: string,
  goals: Block[],
  artifacts: Artifact[]
): Artifact[] =>
  artifacts?.filter((artifact) => {
    if (artifact.source === "bell") return artifact.bell_id === bellId
    else if (artifact.source === "block") {
      return goals?.filter((goal) => goal?.id === artifact.block_id).length > 0
    } else {
      return false
    }
  })

const findSubGoals = (goalId: string, goals: Block[]): Block[] => {
  if (goalId === "all") return goals
  else
    return goals?.filter(
      (goal) =>
        goal.id === goalId ||
        goal.parent?.id === goalId ||
        goal.parent?.parent?.id === goalId
    )
}

export {
  listToTree,
  listTreeGenerations,
  filterGoalTasks,
  filterGoalNotifications,
  filterGoalArtifacts,
  findSubGoals,
}

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
 * output: tree with 2 levels depth, skip all sub level items
 */
const listTree2Level = (list: Array<any>) => {
  const roots = list.filter((item) => item.parent_id === null)
  const children = list.filter((item) => item.parent_id !== null)
  const result = []

  roots.forEach((root) => {
    result.push(root)

    children.forEach((child) => {
      if (child.parent_id === root.id) {
        // root.children.push(child)
        child.className = "generation-2"
        result.push(child)
      }
    })
  })

  return result
}

export { listToTree, listTree2Level }

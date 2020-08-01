import stringHash from "string-hash"

/* card color bins */
const stringHashBucket = (str: string, N: number) => {
  return stringHash(str) % N
}

/* date */

const dateFormat = "MMM DD, YYYY h:mm a"
const dateFormatShort = "h:mm a"

/* list to tree */
const listToTree = (list: Array<any>) => {
  const map = {}
  let node
  const roots = []
  let i

  for (i = 0; i < list.length; i += 1) {
    // initialize the map
    map[list[i].id] = i
    // initialize the children
    list[i].children = []
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    if (node.parent_id !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parent_id]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}

/**
 * input: list of items with parent_id references
 * output: tree with 2 levels depth
 */
const listTree2Level = (list: Array<any>) => {
  const roots = list.filter((item) => item.parent_id === null)
  const children = list.filter((item) => item.parent_id !== null)
  const result = []

  roots.forEach((root) => {
    root.children = []
    children.forEach((child) => {
      if (child.parent_id === root.id) {
        root.children.push(child)
      }
    })
    result.push(root)
  })

  return result
}

export {
  stringHashBucket,
  dateFormat,
  dateFormatShort,
  listToTree,
  listTree2Level,
}

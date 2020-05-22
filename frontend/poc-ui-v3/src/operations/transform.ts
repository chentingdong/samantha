import { MutationType } from "../models/enum"

const _transformBlockInput = (block, mutationType = MutationType.Connect) => {
  if (!Object.isExtensible(block)) block = { ...block }

  typeof block.__mutation_type__ !== "undefined"
    ? (mutationType = block.__mutation_type__)
    : (block.__mutation_type__ = mutationType)

  delete block.parent

  const childrenForCreate = []
  const childrenForConnect = []
  const childrenForDelete = []
  for (const child of block.children) {
    switch (child.__mutation_type__) {
      case MutationType.Create:
        const transformedChild = _transformBlockInput(child, mutationType)
        childrenForCreate.push(transformedChild)
        break
      case MutationType.Delete:
        childrenForDelete.push({ id: child.id })
        break
      default:
        childrenForConnect.push({ id: child.id })
        break
    }
  }
  block.children = {}
  if (childrenForCreate.length > 0) block.children.create = childrenForCreate
  if (childrenForDelete.length > 0) block.children.delete = childrenForDelete
  if (childrenForConnect.length > 0) block.children.connect = childrenForConnect

  block.requestors = { connect: block.requestors?.map((id) => ({ id })) }
  block.responders = { connect: block.responders?.map((id) => ({ id })) }

  return block
}

const _clearnBlockInput = (block) => {
  delete block.__mutation_type__
  delete block.__typename
  block.children?.create?.map((child) => _clearnBlockInput(child))
  block.children?.connect?.map((child) => _clearnBlockInput(child))
  return block
}

const transformBlockInput = (block) => {
  return _clearnBlockInput(_transformBlockInput(block))
}

export { transformBlockInput }

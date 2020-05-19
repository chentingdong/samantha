import { MutationType } from "../components/context/enum"

const _transformBlockInput = (block, mutationType = MutationType.Connect) => {
  if (!Object.isExtensible(block)) block = { ...block }

  console.log(
    `in transform: block ${block.id}, block.__mutation_type__: ${block.__mutation_type__}`
  )
  typeof block.__mutation_type__ !== "undefined"
    ? (mutationType = block.__mutation_type__)
    : (block.__mutation_type__ = mutationType)
  if (mutationType === MutationType.Create) delete block.id
  console.log(`in transform: block ${block.id}, mutationType: ${mutationType}`)

  delete block.parent

  const childrenForCreate = []
  const childrenForConnect = []
  for (const child of block.children) {
    if (child.__mutation_type__ === MutationType.Create) {
      const transformedChild = _transformBlockInput(child, mutationType)
      childrenForCreate.push(transformedChild)
    } else {
      childrenForConnect.push({ id: child.id })
    }
  }
  block.children = {}
  if (childrenForCreate.length > 0) block.children.create = childrenForCreate
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

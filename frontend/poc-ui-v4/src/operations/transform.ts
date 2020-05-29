import { MutationType } from "../models/enum"

const _transformBlockInput = (block) => {
  if (!Object.isExtensible(block)) block = { ...block }

  delete block.parent

  const childrenForCreate = []
  for (const child of block.children) {
    switch (child.__mutation_type__) {
      case MutationType.Create:
        const transformedChild = _transformBlockInput(child)
        childrenForCreate.push(transformedChild)
        break
    }
  }
  block.children = {}
  if (childrenForCreate.length > 0) block.children.create = childrenForCreate

  block.requestors = { connect: block.requestors?.map((id) => ({ id })) }
  block.responders = { connect: block.responders?.map((id) => ({ id })) }

  return block
}

const _clearnBlockInput = (block) => {
  delete block.__mutation_type__
  delete block.__typename
  block.children?.create?.map((child) => _clearnBlockInput(child))
  return block
}

const transformBlockInput = (block) => {
  return _clearnBlockInput(_transformBlockInput(block))
}

export { transformBlockInput }

import { MutationType, Typename } from "../models/enum"
import cloneDeep from "lodash/cloneDeep"

const _transformBlockInput = (block) => {
  if (!Object.isExtensible(block)) block = { ...block }

  if (block.parent) block.parent = { connect: { id: block.parent.id } }

  const childrenForCreate = []
  for (const child of block.children) {
    const transformedChild = _transformBlockInput(child)
    childrenForCreate.push(transformedChild)
  }
  block.children = {}
  if (childrenForCreate.length > 0) block.children.create = childrenForCreate

  if (block.requestors?.length > 0)
    block.requestors = {
      connect: block.requestors?.map((user) => ({ id: user.id })),
    }
  if (block.responders?.length > 0)
    block.responders = {
      connect: block.responders?.map((user) => ({ id: user.id })),
    }

  return block
}

const _clearnBlockInput = (block) => {
  if (block.__typename === Typename.BlockDef) {
    delete block.state
    delete block.requestors
    delete block.responders
  }
  delete block.__mutation_type__
  delete block.__typename
  block.children?.create?.map((child) => _clearnBlockInput(child))
  return block
}

const transformBlockInput = (block) => {
  return _clearnBlockInput(_transformBlockInput(block))
}

export { transformBlockInput }

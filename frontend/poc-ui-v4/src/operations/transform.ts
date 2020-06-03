import { MutationType } from "../models/enum"
import cloneDeep from "lodash/cloneDeep"

const _transformBlockInput = (block) => {
  if (!Object.isExtensible(block)) block = { ...block }

  delete block.parent

  const childrenForCreate = []
  for (const child of block.children) {
    const transformedChild = _transformBlockInput(child)
    childrenForCreate.push(transformedChild)
    console.log(
      `transformedChild: ${JSON.stringify(transformedChild, null, 2)}`
    )
  }
  block.children = {}
  console.log(
    `childrenForCreate: ${JSON.stringify(childrenForCreate, null, 2)}`
  )
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
  delete block.__mutation_type__
  delete block.__typename
  block.children?.create?.map((child) => _clearnBlockInput(child))
  return block
}

const transformBlockInput = (block) => {
  return _clearnBlockInput(_transformBlockInput(block))
}

export { transformBlockInput }

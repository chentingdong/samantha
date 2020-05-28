import { log } from 'nexus'
import uuid from 'uuid'
// example resolvers

function cloneOneBlock(blockDef: any) {
  if (!blockDef) {
    return null
  }
  const block = { ...blockDef }
  block.id = uuid.v4()
  delete block.parentId

  if (block.children?.length > 0)
    block.children = {
      create: block.children?.map((child: any) => {
        const result = {
          ...child,
          id: uuid.v4(),
        }
        delete result.parentId
        return result
      }),
    }

  return block
}

export const customQueryResolver = async (parent, args, ctx) => {
  log.debug('in customQuery resolver')
  return ctx.db.user.findMany() // <== `ctx.db` is your Prisma Client instance
}

export const customMutationResolver = async (parent, args, ctx) => {
  log.debug('in customMutation resolver')
  return ctx.db.user.findMany()
}

export const cloneOneBlockResolver = async (p, args, ctx) => {
  const blockDef = await ctx.db.blockDef.findOne({
    ...args,
    include: {
      parent: true,
      children: true,
    },
  })

  const cloneData = cloneOneBlock(blockDef)

  log.debug(
    `cloneOneBlockResolver cloneOneBlockResolver cloneData: ${JSON.stringify(
      cloneData,
      null,
      2,
    )}`,
  )

  if (cloneData) return await ctx.db.block.create({ data: cloneData })

  return { error: 'clone data is null' }
}

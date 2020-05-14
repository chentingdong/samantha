// example resolvers

function cloneOneBlock(block: any) {
  delete block.id
  delete block.parentId

  if (block.parent)
    block.parent = {
      connect: { id: block.parent.id },
    }

  if (block.children.length > 0)
    block.children = {
      connect: block.children.map((child: any) => ({
        id: child.id,
      })),
    }

  if (block.requestors.length > 0)
    block.requestors = {
      connect: block.requestors.map((user: any) => ({
        id: user.id,
      })),
    }

  if (block.responders.length > 0)
    block.responders = {
      connect: block.responders.map((user: any) => ({
        id: user.id,
      })),
    }
  return block
}

export const customQueryResolver = async (parent, args, ctx) => {
  console.log('in customQuery resolver')
  return ctx.db.user.findMany() // <== `ctx.db` is your Prisma Client instance
}

export const customMutationResolver = async (parent, args, ctx) => {
  console.log('in customMutation resolver')
  return ctx.db.user.findMany()
}

export const cloneOneBlockResolver = async (p, args, ctx) => {
  console.log(JSON.stringify(p))
  console.log(JSON.stringify(args))
  const block = await ctx.db.block.findOne({
    ...args,
    include: {
      parent: true,
      children: true,
      requestors: true,
      responders: true,
    },
  })
  const cloneData = cloneOneBlock(block)
  console.log(cloneData)
  return ctx.db.block.create({ data: cloneData })
}

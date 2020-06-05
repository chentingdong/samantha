import { schema } from 'nexus'

schema.middleware((config) => {
  const type = config.parentTypeConfig.name
  if (!['Query', 'Mutation'].includes(type)) {
    return
  }
  return async (root, args, ctx, info, next) => {
    const startTimeMs = new Date().valueOf()
    const result = await next(root, args, ctx, info)
    const endTimeMs = new Date().valueOf()
    const resolver = `${type}.${config.fieldConfig.name}`
    const completionTime = endTimeMs - startTimeMs

    ctx.log.info(`Resolver '${resolver}' took ${completionTime} ms`, {
      resolver,
      completionTime,
    })

    return result
  }
})

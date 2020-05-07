import { schema } from 'nexus'

schema.mutationType({
  definition(t) {
    t.crud.createOneUser()
    t.crud.updateOneUser()
    t.crud.upsertOneUser()
    t.crud.deleteOneUser()
    t.crud.createOneBlock()
    t.crud.updateOneBlock()
    t.crud.upsertOneBlock()
    t.crud.deleteOneBlock()
    t.list.field('customMutation', {
      type: 'User',
      resolve(parent, args, ctx) {
        console.log('in customMutation resolver')
        return ctx.db.user.findMany() // <== `ctx.db` is your Prisma Client instance
      },
    })
  },
})

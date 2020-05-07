import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.requestedBlocks()
    t.model.respondedBlocks()
  },
})

schema.objectType({
  name: 'Block',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.parent()
    t.model.children()
    t.model.state()
    t.model.control()
    t.model.type()
    t.model.requestors()
    t.model.responders()
  },
})

schema.queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({
      ordering: true,
      filtering: true,
    })
    t.crud.block()
    t.crud.blocks({
      ordering: true,
      filtering: true,
    })
    t.list.field('customQuery', {
      type: 'User',
      resolve(parent, args, ctx) {
        console.log('in customQuery resolver')
        return ctx.db.user.findMany() // <== `ctx.db` is your Prisma Client instance
      },
    })
  },
})

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

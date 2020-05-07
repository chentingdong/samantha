import { schema } from 'nexus'

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

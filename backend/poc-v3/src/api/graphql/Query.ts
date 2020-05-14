import { schema } from 'nexus'
import { customQueryResolver } from './Resolver'

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
      resolve: customQueryResolver,
    })
  },
})

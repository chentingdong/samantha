import { schema } from 'nexus'
import { customMutationResolver, cloneOneBlockResolver } from './Resolver'

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
      resolve: customMutationResolver,
    })
    t.field('cloneOneBlock', {
      type: 'Block',
      args: {
        where: schema.arg({
          type: 'BlockWhereUniqueInput',
          required: true,
        }),
      },
      resolve: cloneOneBlockResolver,
    })
  },
})

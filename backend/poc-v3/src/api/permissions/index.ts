import { rule } from 'nexus-plugin-shield'
import { getUserId } from '../utils'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    const userId = getUserId(ctx.token)
    return Boolean(userId)
  },
)

// TODO: figure out how to do it reflectively
const rules = {
  Query: {
    user: isAuthenticated,
    users: isAuthenticated,
    block: isAuthenticated,
    blocks: isAuthenticated,
    blockDef: isAuthenticated,
    blockDefs: isAuthenticated,
    customQuery: isAuthenticated,
  },
  Mutations: {
    createOneUser: isAuthenticated,
    updateOneUser: isAuthenticated,
    upsertOneUser: isAuthenticated,
    deleteOneUser: isAuthenticated,
    createOneBlock: isAuthenticated,
    updateOneBlock: isAuthenticated,
    upsertOneBlock: isAuthenticated,
    deleteOneBlock: isAuthenticated,
    createOneBlockDef: isAuthenticated,
    updateOneBlockDef: isAuthenticated,
    upsertOneBlockDef: isAuthenticated,
    deleteOneBlockDef: isAuthenticated,
    customMutation: isAuthenticated,
    cloneOneBlock: isAuthenticated,
  },
}

export { rules }

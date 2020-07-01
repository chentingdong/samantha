import { schema } from 'nexus'

schema.objectType({
  name: 'BlockDef',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.description()
    t.model.parent()
    t.model.children()
    t.model.control()
    t.model.context()
    t.model.action()
    t.model.type()
    t.model.created_at()
    t.model.last_updated()
  },
})

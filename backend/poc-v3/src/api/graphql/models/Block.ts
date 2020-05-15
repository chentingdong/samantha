import { schema } from 'nexus'

schema.objectType({
  name: 'Block',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.description()
    t.model.parent()
    t.model.children()
    t.model.state()
    t.model.control()
    t.model.inCatalog()
    t.model.context()
    t.model.type()
    t.model.requestors()
    t.model.responders()
  },
})

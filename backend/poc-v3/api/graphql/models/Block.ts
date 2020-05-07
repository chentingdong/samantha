import { schema } from 'nexus'

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

// used by react context store, which is used by src/themes

export default {
  isAuthenticated: false,
  user: {},
  users: [],
  draftBlock: {
    id: "0",
    name: "",
    description: "",
    type: "",
    control: "",
    state: "Draft",
    control: {},
    context: {},
    props: {},
    requestors: [],
    responders: [],
    root: null,
    parent: null,
    children: [],
    created_at: new Date(),
    last_updated: new Date(),
  },
  messages: [],
  uiState: {
    showEditRequestDef: false,
    showEditRequest: false,
    showRequestViewRequester: false,
    showRequestViewResponder: false,
  },
}

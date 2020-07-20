// used by react context store, which is used by src/themes

export const state = {
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
    parents: [],
    children: [],
    created_at: new Date(),
    last_updated: new Date(),
  },
  messages: [],
  uiState: {
    // M1 ui states
    showEditRequestDef: false,
    showEditRequest: false,
    showBellEditor: false,
    showRequestViewRequester: false,
    showRequestViewResponder: false,
    // M2 ui states
    currentBellhopId: "",
    currentBellId: "",
    currentBlockId: "",
  },
}

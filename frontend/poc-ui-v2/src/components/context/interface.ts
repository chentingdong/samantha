export interface RequestDef {
  id: string
  name: string
  description: string
  state: string
  requester: string
  responders: string[]
  blocks: BlockDef[]
}

export interface BlockDef {
  id: string
  name: string
  description: string
  state: string
  requester: string
  responders: string[]
  form: object
}

export interface UiState {
  showEditRequestDef: boolean
}

export interface User {
  id?: string
  attributes?: object
}

export interface State {
  isAuthenticated: boolean
  user: User
  users: User[]
  currentRequest: RequestDef
  requestDefs: RequestDef[]
  currentBlock: BlockDef
  blockDefs: BlockDef[]
  messages: object[]
  uiState: UiState
}

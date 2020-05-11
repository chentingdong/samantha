export interface RequestDef {
  id?: string
  name?: string
  description?: string
  type?: string
  state?: string
  requester?: string
  responders?: string[]
  blocks?: BlockDef[]
}
export interface BlockDef {
  id: string
  name: string
  description: string
  type: string
  state: string
  requester: string
  responders: string[]
  blocks?: BlockDef[]
}

export interface UiState {
  showEditRequestDef?: boolean
  showEditRequest?: boolean
  showRequestViewRequester?: boolean
  showRequestViewResponder?: boolean
}

export interface User {
  id?: string
  attributes?: {
    email?: string
    name?: string
    given_name?: string
    family_name?: string
    picture?: string
  }
}

export interface State {
  isAuthenticated: boolean
  user: User
  users: User[]
  currentRequestDef: RequestDef
  requestDefs: RequestDef[]
  currentBlockDef: BlockDef
  blockDefs: BlockDef[]
  currentRequest?: RequestDef
  requests: RequestDef[]
  messages: object[]
  uiState: UiState
}

import { MutationType } from "./enum"

export interface Block {
  id: number
  name: string
  description: string
  type: string
  inCatalog?: boolean
  state: string
  control?: string
  context?: string
  requestors: User[]
  responders: User[]
  parent: Block
  children?: Block[]
  __mutation_type__?: MutationType
}

export interface UiState {
  showEditRequestDef?: boolean
  showEditRequest?: boolean
  showRequestViewRequester?: boolean
  showRequestViewResponder?: boolean
}

export interface User {
  id?: string
  name?: string
  email?: string
  picture?: string
  given_name?: string
  family_name?: string
}

export interface CognitoUser {
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
  user: CognitoUser
  users: User[]
  blockCreateInput: Block
  messages: object[]
  uiState: UiState
}

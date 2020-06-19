import { MutationType, EditMode, Typename } from "./enum"

export interface Block {
  id: string
  name: string
  description: string
  type: string
  state: string
  props?: string
  context?: string
  action?: string
  parent?: BlockOrDef
  children: BlockOrDef[]
  block_requestors: BlockUser[]
  block_responders: BlockUser[]
  created_at: Date
  last_updated: Date
  due_date?: Date
  __mutation_type__?: MutationType
  __typename?: string
}

export interface BlockDef {
  id: string
  name: string
  description: string
  type: string
  props?: string
  state?: string
  action?: string
  parent?: BlockOrDef
  children: BlockOrDef[]
  created_at: Date
  last_updated: Date
  __mutation_type__?: MutationType
  __typename?: string
}

export type BlockOrDef = Block | BlockDef

export interface UiState {
  showEditor?: boolean
  editorMode?: EditMode
  editingTypename?: Typename
  draftBlock?: BlockOrDef
}

// for postgres many to many relationship
export interface BlockUser {
  user_id: string
  block_id: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  isAuthenticated?: boolean
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
  draftBlock?: BlockOrDef
}

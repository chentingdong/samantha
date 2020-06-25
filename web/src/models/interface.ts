import { MutationType, EditMode, Typename } from "./enum"

export interface Block {
  id: string
  name: string
  description: string
  type: string
  state: string
  props?: object
  context?: object
  control?: object
  root?: BlockOrDef
  parent?: BlockOrDef
  children: BlockOrDef[]
  requestors: BlockUser[]
  responders: BlockUser[]
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
  props?: object
  state?: object
  control?: object
  root?: BlockOrDef
  parent?: BlockOrDef
  children: BlockOrDef[]
  requestors: BlockUser[]
  responders: BlockUser[]
  created_at: Date
  last_updated: Date
  __mutation_type__?: MutationType
  __typename?: string
}

export type BlockOrDef = Block | BlockDef

export interface UiState {
  showEditor?: boolean
  draftBlock?: BlockOrDef
  showBlockEditor?: boolean
  currentBlockId?: string
  editorMode?: EditMode
  editingTypename?: Typename
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

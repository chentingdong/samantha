import { MutationType, EditMode, Typename } from "./enum"

export interface Bell {
  id: string
  name: string
  description?: string
  state: string
  context: unknown
  created_at: Date
  last_updated: Date
  started_at: Date
  root_block_id: string
  block: unknown
}

export interface Block {
  id: string
  name: string
  description: string
  type: string
  blockType?: unknown
  state: string
  props?: unknown
  context?: unknown
  control?: unknown
  root?: BlockOrDef
  bells?: Bell[]
  parents: ParentChild[]
  children: ParentChild[]
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
  blockType?: unknown
  props?: unknown
  state?: unknown
  control?: unknown
  root?: BlockOrDef
  bells?: Bell[]
  parents: ParentChild[]
  children: ParentChild[]
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
  showBellEditor?: boolean
  currentBellId?: string
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

// for postgres many to many relationship
export interface ParentChild {
  parent_id: string
  child_id: string
  parent?: BlockOrDef
  child?: BlockOrDef
  sibling_order?: number
}

export interface User {
  id: string
  name: string
  email: string
  family_name?: string
  given_name?: string
  picture?: string
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

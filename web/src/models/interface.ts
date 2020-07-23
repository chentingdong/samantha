import { MutationType, EditMode, Typename } from "./enum"

export interface Bell {
  id: string
  name: string
  description?: string
  bellhop_owner_id: string
  bellhop_initiator_id: string
  user_initiator_id: string
  context: unknown
  inputs: string
  outputs: string
  state: string
  is_definition: boolean
  private: boolean
  menu_order: number
  can_act_as_subbell: boolean
  created_at: Date
  last_updated: Date
  started_at: Date
  root_block_id: string
  blocks: Block[]
}

export interface Bellhop {
  id: string
  name: string
  metadata?: string
  profile_image_url: string
  created_at: Date
  updated_at: Date
}

export interface Block {
  id: string
  local_id: string
  bell_id: string
  state: string
  type: string
  is_definition: boolean
  configs: string
  created_at: Date
  last_updated: Date
  started_at: Date
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
  editorMode?: EditMode
  editingTypename?: Typename
  currentBellhopId?: string
  currentBellId?: string
  currentBlockId?: string
  runningBellId?: string
  showNotification?: boolean
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

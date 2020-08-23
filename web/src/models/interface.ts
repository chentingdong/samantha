import { EditMode, MutationType, Typename } from "./enum"

export interface RouterUrlProps {
  menu: string
  bellId?: string
  goalId?: string
  context?: string
  taskId?: string
  desk?: string
  bellhopId?: string
}

export interface Bell {
  id: string
  name: string
  description: string
  context: unknown
  inputs: unknown
  outputs: unknown
  state: string
  is_definition: boolean
  created_at: Date
  last_updated: Date
  started_at: Date
  updated_at: Date
  root_block_id: string
  blocks: Block[]
  goal_name: string
  goal_order: number
  acts_as_main_bell: true
  main_bell_id: string
  success_conditions: unknown
  bellhop_participations: Participant[]
  user_participations: Participant[]
}

export interface Bellhop {
  id: string
  name: string
  description: string
  metadata?: string
  profile_image_url: string
  created_at: Date
  updated_at: Date
  memberships: Participant[]
}

export interface Block {
  id: string
  name: string
  local_id: string
  bell_id: string
  state: string
  type: string
  is_definition: boolean
  configs: string
  created_at: Date
  last_updated: Date
  started_at: Date
  ended_at: Date
  parent_id: string
  parent: Block
  sibling_order: string
  user_participations: Participant[]
  __mutation_type__?: MutationType
  __typename?: string
}

export interface Artifact {
  source: string
  bell_id?: string
  block_id?: string
  url: string
  title: string
  filename: string
  created_at: Date
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

export interface Participant {
  role: string
  user: User
  bellhop: Bellhop
}

export interface TaskDetail {
  id: string
  title: string
  fields: unknown
}

export interface TemplateFieldText {
  optional: boolean
  question: string
  response: number
  response_type: string
  max_field_size: number
  min_field_size: number
}

export interface TemplateFieldDecimal {
  optional: boolean
  question: string
  response: number
  min_value: number
  max_value: number
  response_type: string
}

export interface TemplateFieldSelect {
  optional: boolean
  question: string
  response: number
  response_type: string
  select_options: string[]
}

export interface Room {
  id: string
  name: string
  type: string
  user_participations: Participant[]
  created_at: Date
  ended_at: Date
  last_post_at: Date
  last_visited_at: Date
}

export interface Message {
  id: string
  conversation_id: string
  type: string
  content: string
  from_user_id: string
  from_user: User
  to_user_id: string
  to_user: User
  created_at: Date
  updated_at: Date
  attachments_ids: string[]
  attachments: Attachment[]
  read_ids: string[]
  delivered_ids: string[]
}

export interface Attachment {
  id: string
  type: string
  url: string
  created_at: Date
  updated_at: Date
}

/* below are for M1, deprecated */
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
  currentBellDefId?: string
  currentBlockId?: string
  runningBellId?: string
  showNotification?: boolean
  mainMenuActiveItem?: string
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

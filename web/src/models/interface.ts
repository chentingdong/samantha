import { MutationType, EditMode, Typename } from "./enum"

export interface Block {
  id: string
  name: string
  description: string
  type: string
  state: string
  props?: string
  context?: string
  parent?: BlockOrDef
  children: BlockOrDef[]
  requestors: User[]
  responders: User[]
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

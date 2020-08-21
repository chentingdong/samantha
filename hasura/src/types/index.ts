import { TopLevelCondition } from "json-rules-engine/types"

type clone_m2_bells_pk_columns_input = {
  id: string
}

export type clone_m2_bells_by_pk_args = {
  pk_columns: clone_m2_bells_pk_columns_input
  is_definition: boolean
  start_on_create: boolean
}

export type clone_m2_bells_pk_columns_output = {
  new_id: string
}

export enum BlockState {
  Draft = "Draft",
  Created = "Created",
  Running = "Running",
  Success = "Success",
  Failure = "Failure",
}

export type BlockTypeMap = {
  [index: string]: any
}

export type UserBlockParticipation = {
  user_id: string
  role: string
}

export type BellhopBellParticipation = {
  bellhop_id: string
  role: string
}

export type UserBellParticipation = {
  user_id: string
  role: string
}

export type Block = {
  id: string
  name?: string
  local_id?: string
  is_definition?: boolean
  type?: string
  state?: string
  configs?: BlockConfigs
  parent_id?: string
  sibling_order?: number
  user_participations?: UserBlockParticipation[]
  users?: UserBlockParticipation[] // alias
  goal?: Goal
  task?: Task
  bell_executor?: BellExecutor
  children?: Block[]
  bell?: Bell
  bell_id?: string
  started_at?: string | null
  ended_at?: string | null
  updated_at?: string | null
}

export type BlockConfigs = {
  control_type?: string
  pre_conditions?: TopLevelCondition
}

export type Goal = {
  goal_name: string
  success_conditions: object
}

export type Task = {
  title?: string
  fields: Field[]
}

export type BellExecutor = {
  bell_id?: string
  block?: Block
  context?: object
}

export type Bell = {
  id?: string
  name?: string
  description?: string
  root_block_id?: string
  sub_bells?: Bell[]
  user_participations?: UserBellParticipation[]
  bellhop_participations?: BellhopBellParticipation[]
  users?: UserBellParticipation[] // alias
  bellhops?: BellhopBellParticipation[] // alias
  blocks?: Block[]
  context?: object
  acts_as_main_bell?: boolean
  started_at: string | null
  ended_at: string | null
}

export type Field = {
  optional: boolean
  question: string
  response_type: string
  select_options?: string[]
  response?: string | number | null
  max_field_size?: number
  min_field_size?: number
  max_value?: number
  min_value?: number
}

export type BellWithContext = {
  blocks: Block[]
  root_block_id: string
  context: object
  started_at: string | null
  ended_at: string | null
  users?: UserBellParticipation[]
  bellhops?: BellhopBellParticipation[]
}

export type Blocks = {
  [local_id: string]: {
    id?: string
    local_id?: string
    state: string | null
    started_at?: string | null
    ended_at?: string | null
  }
}

export type Tasks = {
  [local_id: string]: {
    id?: string
    local_id?: string
    fields: Field[]
  }
}

export type APIExecutors = {
  [local_id: string]: {
    id?: string
    local_id?: string
    response: object
  }
}

export type BellExecutors = {
  [local_id: string]: {
    id?: string
    local_id?: string
    context: object
  }
}

export type BellContextFacts = {
  context: {
    block?: Blocks
    task?: Tasks
    bell_executor?: BellExecutors
    api_executor?: APIExecutors
    bell?: Bell
    users?: UserBlockParticipation[]
  }
}

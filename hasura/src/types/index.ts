type clone_m2_bells_pk_columns_input = {
  id: string
}

export type clone_m2_bells_by_pk_args = {
  pk_columns: clone_m2_bells_pk_columns_input
  is_definition: boolean
}

export type clone_m2_bells_pk_columns_output = {
  new_id: string
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
  name: string
  local_id: string
  type: string
  configs: object
  sibling_order: number
  user_participations: UserBlockParticipation[]
  goal?: Goal
  task?: Task
  bell_executor?: BellExecutor
  children: Block[]
}

export type Goal = {
  goal_name: string
  success_conditions: object
}

export type Task = {
  title: string
  fields: Field[]
}

export type BellExecutor = {
  bell_id: string
  block: Block
}

export type Bell = {
  id: string
  name: string
  description: string
  root_block_id: string
  sub_bells: Bell[]
  user_participations: UserBellParticipation[]
  bellhop_participations: BellhopBellParticipation[]
  blocks: Block[]
}

export type Field = {
  optional: boolean
  question: string
  response_type: string
  select_option?: string[]
  response?: string | number | null
  max_field_size?: number
  min_field_size?: number
  max_value?: number
  min_value?: number
}

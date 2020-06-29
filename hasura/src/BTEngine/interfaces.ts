export enum BlockState {
  Created = "Created",
  Running = "Running",
  Success = "Success",
  Failure = "Failure",
}

export interface ParentChild {
  parent_id: string
  child_id: string
  parent?: Block
  child?: Block
  sibling_order?: number
}

export interface Block {
  id: string
  name: string
  type: string
  state: BlockState
  children: ParentChild[]
  root: Block
  context: any
  control: any
}

export interface BlockTypeMap {
  [index: string]: any
}

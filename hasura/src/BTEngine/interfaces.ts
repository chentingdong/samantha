export enum BlockState {
  Created = "Created",
  Running = "Running",
  Success = "Success",
  Failure = "Failure",
}

export interface Block {
  id: string
  name: string
  type: string
  state: BlockState
  children: Block[]
}

export interface BlockTypeMap {
  [index: string]: any
}

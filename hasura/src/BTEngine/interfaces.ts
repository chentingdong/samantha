export interface Block {
  type: string
}

export interface BlockTypeMap {
  [index: string]: (block: Block) => void
}

import { BlockDef } from "./block-def";

export class RequestDef {
  name: string;
  blockDefs: BlockDef[] = [];

  constructor(name: string, blockDefs?: BlockDef[]) {
    this.name = name;
    if (blockDefs) this.blockDefs = blockDefs;
  }

  addBlockDef(blockDef: BlockDef) {
    this.blockDefs.push(blockDef);
  }
}

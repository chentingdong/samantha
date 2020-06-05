import { BlockDef } from "./block-def";
import { uuid } from "uuidv4";

export class RequestDef {
  id: string;
  name: string;
  blockDefs: BlockDef[] = [];
  description?: string;
  config?: {};
  data?: {};
  tag: [];
  constructor(name: string, blockDefs?: BlockDef[]) {
    this.id = uuid();
    this.name = name;
    if (blockDefs) this.blockDefs = blockDefs;
    this.tag = [];
  }

  addBlockDef(blockDef: BlockDef) {
    this.blockDefs.push(blockDef);
  }
}

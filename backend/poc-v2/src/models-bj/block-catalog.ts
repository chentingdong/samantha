import { BlockDef } from "./block-def";

export class BlockCatalog {
  blockDefinitions = new Map<string, BlockDef>();

  add(blockDef: BlockDef) {
    this.blockDefinitions.set(blockDef.name, blockDef);
  }

  find(blockDefName: string): BlockDef|undefined {
    return this.blockDefinitions.get(blockDefName);
  }
}

export const blockCatalog = new BlockCatalog();

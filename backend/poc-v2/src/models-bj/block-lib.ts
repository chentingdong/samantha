import { BlockDef } from "./block-def";

class BlockLib {
  definitions = new Map<string, BlockDef>();

  add(blockDef: BlockDef) {
    this.definitions.set(blockDef.name, blockDef);
  }

  find(blockDefName: string): BlockDef|undefined {
    return this.definitions.get(blockDefName);
  }
}

export const blockLib = new BlockLib();

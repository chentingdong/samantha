import blockLibrary from "./data/blockLibrary.json"
import { v4 as uuid } from "uuid";

export enum State {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETE = "complete"
}

export class Block {
  readonly id: string = uuid();
  name: string;
  state: State;
  description?: string;
  blockDef?: Block;
  config: {};
  data: {};

  constructor(name: string, blockDef: Block) {
    this.name = name;
    this.blockDef = blockDef;
    this.state = State.PENDING;

    //if (description) this.description = description;
    this.config = blockDef.config;
    this.data = blockDef.data;
  }

  static getBlockLibrary = (blockType: string) => {
    switch (blockType) {
      case "LEAF":
        return blockLibrary.leafBlocks;
      case "COMPOSITE":
        return blockLibrary.compositeBlocks;
      default:
        return [];
    }
  }

  static getBlockById = (blockType: string, blockId: string) => {
    switch (blockType) {
      case "LEAF":
        let blockFound = {};
        blockLibrary.leafBlocks.map((b: Block) => {
          if (b.id === blockId) blockFound = b;
        });
        return blockFound;

      case "COMPOSITE":
        blockLibrary.compositeBlocks.map((b: Block) => {
          if (b.id === blockId) return b;
        });
      default:
        return { "message": "Not Found" };
    }
  }

  static getBlockByName = (blockType: string, blockName: string) => {
    switch (blockType) {
      case "LEAF":
        let blockFound = {};
        blockLibrary.leafBlocks.map((b: Block) => {
          if (b.name === blockName) blockFound = b;
        });
        return blockFound;

      case "COMPOSITE":
        blockLibrary.compositeBlocks.map((b: Block) => {
          if (b.name === blockName) return b;
        });
      default:
        return { "message": "Not Found" };
    }
  }

  setConfig(): boolean {
    let dataString = JSON.stringify(this.data);
    for (var attribute in this.config) {
      dataString = dataString.replace('config.' + attribute, this.config[attribute]);
    }
    // this.dataString = dataString;
    this.data = JSON.parse(dataString);
    return true;
  }

  start(): boolean {
    if (this.state != State.PENDING)
      return false;
    this.state = State.ACTIVE;
    return true;
  }

  complete(): boolean {
    if (this.state != State.ACTIVE)
      return false;
    this.state = State.COMPLETE;
    return true;
  }


}

export class UIBlock extends Block {

}

export class CompositeBlock extends Block {

}

export class RequestBlock extends Block {

}
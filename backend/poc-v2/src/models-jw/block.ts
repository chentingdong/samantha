import blockLibrary from "./data/blockLibrary.json"
import { v4 as uuid } from "uuid";
import { int } from "aws-sdk/clients/datapipeline";

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
    let blockFound = {};
    switch (blockType) {
      case "LEAF":
        blockLibrary.leafBlocks.map((b: Block) => {
          if (b.id === blockId) blockFound = b;
        });
        return blockFound;

      case "COMPOSITE":
        blockLibrary.compositeBlocks.map((b: Block) => {
          if (b.id === blockId) blockFound = b;
        });
        return blockFound;

      case "SUBREQUEST":
        return blockLibrary.subRequestBlocks[0];
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
    // if (this.state != State.ACTIVE)
    //   return false;
    this.state = State.COMPLETE;
    return true;
  }


}


export enum DependencyType {
  SERIAL = "Serial",  //  this could be the only needed
  PARALLEL = "Parallel",
  OPTIONAL = "Optional"
}

export class DependencyBlock extends Block {
  fromBlocks: Block[];
  toBlocks: Block[];
  dependencyType: String;

  constructor(name: string, blockDef: Block) {
    super(name, blockDef);
    this.fromBlocks = [];
    this.toBlocks = [];
    this.dependencyType = DependencyType.SERIAL; // always default SERIAL
  }

  addFromBlock(block: Block) {
    this.fromBlocks.push(block);
  }

  removeFromBlock(i: int) {
    if ((i > -1) && (i <= this.fromBlocks.length - 1)) {
      this.fromBlocks.splice(i, 1);
      return true;
    } else {
      return false;
    }
  }
  
  setDependencyType(newType: DependencyType) {
    this.dependencyType = newType;
  }

  addToBlock(block: Block) {
    this.toBlocks.push(block);
  }
  removeToBlock(i: int) {
    if ((i > -1) && (i <= this.toBlocks.length - 1)) {
      this.toBlocks.splice(i, 1);
      return true;
    } else {
      return false;
    }
  }

  getFromBlocks() {
    return this.getFromBlocks;
  }

  getToBlocks() {
    return this.toBlocks;
  }

}



export class CompositeBlock extends Block {

}

export class RequestBlock extends Block {

}
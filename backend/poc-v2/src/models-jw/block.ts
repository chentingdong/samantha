import blockLibrary from "./data/blockLibrary.json"

export class Block {
  readonly id: string;
  name: string;
  description?: string;
  
  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;
    if (description) this.description = description;
  }

  static getBlockLibrary = (blockType: string) => {
    switch (blockType) {
      case "SIMPLE":
        return blockLibrary.simpleBlocks;
      case "COMPOSITE":
        return blockLibrary.compositeBlocks;
      default:
        return [];
    }
  }

  static getBlockById = (blockType: string, blockId: string) => {
    switch (blockType) {
      case "SIMPLE":
        console.log('********************* blockId: ' + blockId);
        let blockFound = {};
        blockLibrary.simpleBlocks.map((b: Block) => {
          console.log("***************** ---- b.id: " + b.id + "  (b.id === blockId): " + (b.id === blockId));
          if (b.id === blockId) blockFound = b;
        });
        console.log('blockFound: ');
        console.log(blockFound);
        return blockFound;
      case "COMPOSITE":
        blockLibrary.simpleBlocks.map((b: Block) => {
          if(b.id === blockId) return b;        
        });
      default:
        return {};
    }
  }

}

export class UIBlock extends Block {

}

export class CompositeBlock extends Block {

}

export class RequestBlock extends Block {

}
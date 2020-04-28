import uuid from 'uuid';
import { BlockDef } from './block-def';

export class Block {
  readonly id: string = uuid.v4();
  definition: BlockDef;
  
  constructor(definition: BlockDef) {
    this.definition = definition;
  }
}

export class UIBlock extends Block {

}

export class CompositeBlock extends Block {

}

export class RequestBlock extends Block {

}
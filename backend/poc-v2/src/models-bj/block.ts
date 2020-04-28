import uuid from 'uuid';
import { BlockDef } from './block-def';

export enum State {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETE = "complete"
}

export class Block {
  readonly id: string = uuid.v4();
  state: State;
  definition: BlockDef;
  
  constructor(definition: BlockDef) {
    this.definition = definition;
    this.state = State.PENDING;
  }
}

export class UIBlock extends Block {

}

export class CompositeBlock extends Block {

}

export class RequestBlock extends Block {

}
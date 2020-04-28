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
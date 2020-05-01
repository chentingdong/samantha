import uuid from 'uuid';
import { User } from "./user";
import _ from "lodash";

// TODO: define lifecycle, implement proper state machine
export enum State {
  ACTIVE = "active",
  COMPLETE = "complete"
}

export class Block {
  id: string = uuid.v4();
  name: string;
  description?: string;
  state: State;
  requestors: User[] = [];
  responders: User[] = [];
  
  constructor(name: string, description?: string) {
    this.name = name;    
    if (description) this.description = description;
    this.state = State.ACTIVE;
  }

  public clone(requestors?: User[], responders?: User[]): this {
    const clone = _.cloneDeep(this);
    clone.id = uuid.v4();
    if (requestors) clone.requestors = _.cloneDeep(requestors);
    if (responders) clone.responders = _.cloneDeep(responders);
    clone.state = State.ACTIVE;
    return clone;
  }
  
  public addRequestor(requestor: User) {
    this.requestors.push(requestor);
  }

  public addResponder(responder: User) {
    this.responders.push(responder);
  }

  public complete(): boolean {
    if (this.state != State.ACTIVE)
      return false;
    this.state = State.COMPLETE;
    return true;
  }
}

export class CompositeBlock extends Block {
  blocks: Block[] = [];

  public addBlock(block: Block) {
    this.blocks.push(block);
  }

  public listActiveBlocks(): Block[] {
    return this.blocks.filter((block) => block.state == State.ACTIVE);
  }  
}

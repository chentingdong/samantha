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
  parent: Block|null = null;
  state: State;
  requestors: User[] = [];
  responders: User[] = [];
  
  constructor(name: string, description?: string, parent?: Block) {
    this.name = name;    
    if (description) this.description = description;
    if (parent) this.parent = parent;
    this.state = State.ACTIVE;
  }

  public clone(parent: Block|null, requestors?: User[], responders?: User[]): this {
    const clone = _.cloneDeep(this);
    clone.id = uuid.v4();
    clone.parent = parent;
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

  public getSurface(user: User): Object|null {
    if (this.responders.includes(user) || this.requestors.includes(user)) {
      return this;
    }
    return null;
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

  private toDTO(includeBlocks?: boolean): Object {
    const clone = _.cloneDeep(this);
    if (!includeBlocks) {
      delete clone.blocks;
    }
    return clone;
  }

  public getSurface(user: User): Object|null {
    if (this.responders.includes(user)) {
      return this.toDTO(true);;
    }
    if (this.requestors.includes(user)) {
      return this.toDTO(false);
    }
    return null;
  }  
}

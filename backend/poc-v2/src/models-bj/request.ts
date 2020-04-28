import { Block, State as BlockState } from "./block"
import { User } from "./user";
import uuid from 'uuid';

export enum State {
  ACTIVE = "active",
  COMPLETE = "complete"
}

export class Request {
  readonly id: string = uuid.v4();
  title: string;
  description?: string;
  state: State;
  blocks: Block[] = [];
  requestor?: User;
  responders: User[] = [];

  constructor(title: string, description?: string) {
    this.title = title;    
    if (description) this.description = description;
    this.state = State.ACTIVE;
  }

  setRequestor(requestor: User) {
    this.requestor = requestor;
  }

  addResponder(responder: User) {
    this.responders.push(responder);
  }

  addBlock(block: Block) {
    this.blocks.push(block);
  }

  listPendingBlocks(): Block[] {
    return this.blocks.filter((block) => block.state == BlockState.PENDING);
  }

  listActiveBlocks(): Block[] {
    return this.blocks.filter((block) => block.state == BlockState.ACTIVE);
  }

  complete(): boolean {
    if (this.state != State.ACTIVE) return false;
    this.state = State.COMPLETE;
    return true;
  }

  getRequestorsView() { }
  
  getRespondersView() { }
}

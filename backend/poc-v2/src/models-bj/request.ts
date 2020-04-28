import { Block } from "./block"
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
  reqsponders: User[] = [];

  constructor(title: string, description?: string) {
    this.title = title;    
    if (description) this.description = description;
    this.state = State.ACTIVE;
  }

  getRequestorsView() { }
  
  getRespondersView() { }
}

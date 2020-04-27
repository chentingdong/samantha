import { Block } from "./block"
import { User } from "./user";

export enum STATE {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETE = "complete"
}

export class Request {
  readonly id: string;
  name: string;
  description?: string;
  state: STATE;
  blocks: Block[] = [];
  requestors: User[] = [];
  reqsponders: User[] = [];

  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;    
    if (description) this.description = description;
    this.state = STATE.PENDING
  }

  getRequestorsView() { }
  
  getRespondersView() { }
}

import { Block } from "./block"
import { User } from "./user";
import uuid from 'uuid';

export enum STATE {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETE = "complete"
}

export class Request {
  readonly id: string = uuid.v4();
  name: string;
  description?: string;
  state: STATE;
  blocks: Block[] = [];
  requestors: User[] = [];
  reqsponders: User[] = [];

  constructor(name: string, description?: string) {
    this.name = name;
    if (description) this.description = description;
    this.state = STATE.PENDING
  }

  getRequestorsView() { }

  getRespondersView() { }
}

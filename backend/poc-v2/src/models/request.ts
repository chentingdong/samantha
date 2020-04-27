import { Block } from "./block"

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

  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;    
    if (description) this.description = description;
    this.state = STATE.PENDING
  }
}

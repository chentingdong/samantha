import { Block, State as BlockState } from "./block"
import { User } from "./user";
import uuid from 'uuid';
import reqeustCatalog from "./data/requestCatalog.json";

export enum State {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETE = "complete"
}

export class Request {
  readonly id: string = uuid.v4();
  name: string;
  description: string;
  state: State;
  blocks: Block[] = [];
  blockDefs: Block[] = [];
  requestor: User;
  responders: User[] = [];
  originalRequestDef: Request;

  constructor(name: string, description: string, requestDef: Request) {
    this.name = name;
    this.requestor = {"id":"", "name":"", "email":""};
    this.description = description;
    this.state = State.PENDING;
    this.blocks = requestDef.blocks;
    this.blockDefs = requestDef.blockDefs;
    this.originalRequestDef = requestDef;
    this.responders = [];
  
  }

  setRequestor(requestor: User) {
    this.requestor = requestor;
  }

  addResponder(responder: User) {
    this.responders.push(responder);
  }

  addBlockDef(block: Block) {
    this.blockDefs.push(block);
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

  static getRequestMade = (requester: User) => {
    
    return []
  }

  static getRequestCatalog = (tags: string[]) => {

    return reqeustCatalog;
  }

  static getRequestDefById = (requestDefId?: string) => {
    if (!requestDefId) return reqeustCatalog[0];
    // search by id
    let requestDefFound = {};
    reqeustCatalog.map((r: Request) => {
      if (r.id === requestDefId) requestDefFound = r;
    });
    return requestDefFound;
  }

    static getRequestDefByName = (requestDefName?: string) => {
    if (!requestDefName) return reqeustCatalog[0];
    // search by name
    let requestDefFound = {};
    reqeustCatalog.map((r: Request) => {
      if (r.name === requestDefName) requestDefFound = r;
    });
    return requestDefFound;
  }

}

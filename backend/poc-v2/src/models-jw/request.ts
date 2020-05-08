import { Block, State as BlockState, DependencyBlock} from "./block"
import { User } from "./user";
import { v4 as uuid } from "uuid";
import reqeustCatalog from "./data/requestCatalog.json";
import { STATE } from "../models-td/request";

export enum State {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETE = "complete"
}

export class Request {
  readonly id: string = uuid();
  name: string;
  description: string;
  state: State;
  blocks: Block[] = [];
  blockDefs: Block[] = [];
  requestor: User;
  responders: User[] = [];
  originalRequestDef: Request;
  dependencies: DependencyBlock[] = [];

  constructor(name: string, description: string, requestDef: Request) {
    this.name = name;
    this.requestor = {"id":"", "name":"", "email":""};
    this.description = description;
    this.state = State.PENDING;
    this.blocks = [];
    this.blockDefs = requestDef.blockDefs;
    this.originalRequestDef = requestDef;
    this.responders = [];
    this.dependencies = [];
  }

  setRequestor(requestor: User) {
    this.requestor = requestor;
  }

  addResponder(responder: User) {
    this.responders.push(responder);
    this.checkState("responder");  // this would be a context store state auto detect
  }

  // this would be a main area for state / lifecycle discussion
  private checkState(stateScope: String) {
    // if a block state, if config done and responder defined, no dependency change to Active
    switch (stateScope) {
      case "responder":
        // loop through blocks if no dependencies, set all blocks active and trigger notification
        break;
      case "block":
        // check blocks if CRUD, update state with dependencies and  trigger notification
        break;
      case "dependency":
        // loop through blocks with dependencies, set all blocks state accordingly and trigger notification
        break;
    
      default:
        break;
    }

    // start blocks when no dependencies found
    // this.blocks.map((b: Block) => {
    //   b.start()
    // });

    this.state = State.ACTIVE;
  }


  addBlockDef(block: Block) {
    this.blockDefs.push(block);
  }

  addBlock(block: Block) {
    this.blocks.push(block);
  }

  addDependency(block: DependencyBlock) {
    this.dependencies.push(block);
  }


  listPendingBlocks(): Block[] {
    return this.blocks.filter((block) => block.state == BlockState.PENDING);
  }

  listActiveBlocks(): Block[] {
    return this.blocks.filter((block) => block.state == BlockState.ACTIVE);
  }

  start(): boolean {
    // loop through blocks and start block 
    this.blocks.map((block: Block) => {
      block.start();
    });
    // set back to pending if has dependency
    this.dependencies.map((d: DependencyBlock) => {
      d.fromBlocks.map((b: Block) => {
        if (b.state !== State.COMPLETE) {
          d.toBlocks.map((tb: Block) => {
            tb.state = State.PENDING;
          })
        }
      })
    })
    return true;
  }

  complete(): boolean {
    if (this.state != State.ACTIVE) return false;
    this.state = State.COMPLETE;
    return true;
  }

  getRequestorsView() { }

  getRespondersView() { }

  static getRequestMade = (requester: User) => { // need to have a db search of request
    return [{}, {}]
  }

    static getRequestReceived = (requester: User) => { // need to have a db search of request
    return [{}, {}]
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

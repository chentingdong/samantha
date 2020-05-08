import { Block, State as BlockState, DependencyBlock } from "./block"
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
    this.requestor = { "id": "", "name": "", "email": "" };
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
  checkState(stateScope: String) {
    // if a block state, if config done and responder defined, no dependency change to Active
    switch (stateScope) {
      case "responder":
        // loop through all blocks and send notifications to responders
        break;
      case "block":
        // get all pending blocks, ready to start;
        let readyToCompleteRequest = true;
        let readyToStartBlocks = [];
        this.blocks.map((b: Block) => {
          if (b.state !== State.COMPLETE) {
            readyToCompleteRequest = false; // still have not complete block, not ready to complete request
          // console.log('checking b: readyToCompleteRequest: ' + readyToCompleteRequest);
          //   console.log(b)
            if (b.state === State.PENDING) {
              readyToStartBlocks.push(b);
            }
          }
        });

        // if any dependency not complete, remove from ready to start list;
        this.dependencies.map((d: DependencyBlock) => {
          d.fromBlocks.map((b: Block) => {
            if (b.state !== State.COMPLETE) {
              d.toBlocks.map((tb: Block) => {
                readyToStartBlocks = readyToStartBlocks.filter(obj => obj !== tb);
              })
            }
          })
        });
        // start blocks
        readyToStartBlocks.map((b: Block) => {
          b.start();
        });

        // if readyToCompleteRequest, close request  // maybe a function to wrapup request for complete is better.
        // console.log('end: readyToCompleteRequest: ' + readyToCompleteRequest);
        if (readyToCompleteRequest) {
          this.state = State.COMPLETE;
        }

        break;
      case "dependency":
        // this should be just the "block" state change
        break;

      default:
        break;
    }

    // start blocks when no dependencies found
    // this.blocks.map((b: Block) => {
    //   b.start()
    // });


  }

  start(): boolean {
    this.state = State.ACTIVE;
    this.checkState('block')
    return true;
  }

  complete(): boolean {
    if (this.state != State.ACTIVE) return false;
    // complete all blocks that's not complate yet. maybe need a different method, like "close" / "revoke"?
    this.blocks.map((b: Block) => {
      if (b.state !== State.COMPLETE) {
        b.complete();
      }
    });
    this.state = State.COMPLETE;
    return true;
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

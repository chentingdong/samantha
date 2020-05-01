import { RequestDef } from "./request-def";
import requestDefinitions from "./data/requestCatalog.json";
import { BlockDef } from "./block-def";

class RequestCatalog {
  blockDefinitions: Map<string, BlockDef>;
  constructor() {
    blockDefinitions = new Map<string, BlockDef>();
    for(var rd in requestDefinitions) { 
      blockDefinitions.set(rd.name, rd]);
    }  
    
  }

  add(requestDef: RequestDef) {
    //this.definitionList.push(requestDef);
  }

  find(requestDefName: string): RequestDef | undefined {
    return this.definitionList.get(requestDefName);
  }

  list(requestType: string): Map {}
}

export const requestCatalog = new RequestCatalog();

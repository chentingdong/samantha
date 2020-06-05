import { RequestDef } from "./request-def";
import requestDefinitions from "./data/requestCatalog.json";
import { BlockDef } from "./block-def";

class RequestCatalog {
  requestDefs: Map<string, RequestDef>;

  constructor() {
    this.requestDefs = new Map<string, RequestDef>();
    for(var rd in requestDefinitions) { 
      this.requestDefs.set(rd.name, rd);
    }  
    
  }

  add(requestDef: RequestDef) {
    //this.definitionList.push(requestDef);
  }

  find(requestDefName: string): RequestDef | undefined {
    return this.requestDefs.get(requestDefName);
  }

  list(requestType: string): Map {}
}

export const requestCatalog = new RequestCatalog();

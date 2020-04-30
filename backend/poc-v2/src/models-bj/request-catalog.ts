import { RequestDef } from "./request-def";

export class RequestCatalog {
  requestDefinitions = new Map<string, RequestDef>();

  add(requestDef: RequestDef) {
    this.requestDefinitions.set(requestDef.name, requestDef);
  }

  find(requestDefName: string): RequestDef|undefined {
    return this.requestDefinitions.get(requestDefName);
  }
}

export const requestCatalog = new RequestCatalog();

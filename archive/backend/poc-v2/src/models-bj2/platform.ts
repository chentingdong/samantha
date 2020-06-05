import { Request } from "./request";
import { User } from "./user";
import { Block } from "./block";

export class Platform {
  requests: Request[] = [];

  addRequest(request: Request) {
    this.requests.push(request);
  }

  listActiveRequestsByRequestor(requestor: User) {
    return this.requests.filter((req) => req.requestors.includes(requestor));
  }

  listActiveRequestsByResponder(responder: User) {
    return this.requests.filter((req) => req.responders.includes(responder));
  }

  listActiveBlocksByResponder(responder: User) {
    let results: Block[] = [];
    this.requests.map((req) => {
      if (req.responders.includes(responder)) {
        results = [...results, ...req.listActiveBlocks()];
      }
    });
    return results;
  }
}

export const platform = new Platform();

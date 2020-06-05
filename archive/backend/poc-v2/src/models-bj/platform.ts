import { Request } from "./request";
import { User } from "./user";
import { Block } from "./block";

export class Platform {
  requests: Request[] = [];

  addRequest(request: Request) {
    this.requests.push(request);
  }

  listActiveRequestsByRequestor(requestor: User) {
    return this.requests.filter((req) => req.requestor == requestor);
  }

  listActiveRequestsByResponder(responder: User) {
    return this.requests.filter(
      (req) => req.responders.indexOf(responder) != -1
    );
  }

  listActiveBlocksByResponder(responder: User) {
    let results: Block[] = [];
    this.requests.map((req) => {
      if (req.responders.indexOf(responder) != -1) {
        results = [...results, ...req.listActiveBlocks()];
      }
    });
    return results;
  }
}

export const platform = new Platform();

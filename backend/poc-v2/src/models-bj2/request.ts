import { CompositeBlock } from "./block";
import { User } from "./user";

export class Request extends CompositeBlock {
  private getRequestSurface() {
    return this.toDTO(false);
  }

  private getResponseSurface() {
    return this.toDTO(true);
  }

  public getSurface(user: User) {
    if (this.responders.includes(user)) {
      return this.getResponseSurface();
    }
    if (this.requestors.includes(user)) {
      return this.getRequestSurface();
    }
    return null;
  }
}

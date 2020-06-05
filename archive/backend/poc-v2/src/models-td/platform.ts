import { Request } from "./request";

export class Platform {
  requests?: Request[] = [];

  createRequest() {
    const request = new Request()
  }
}

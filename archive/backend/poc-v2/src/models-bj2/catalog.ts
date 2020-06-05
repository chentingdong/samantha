import { Block } from "./block";
import { Request } from "./request";

export class Catalog<T> {
  items = new Map<string, T>();

  add(name: string, block: T) {
    this.items.set(name, block);
  }

  find(name: string): T|undefined {
    return this.items.get(name);
  }
}

export const blockCatalog = new Catalog<Block>();
export const requestCatalog = new Catalog<Request>();
